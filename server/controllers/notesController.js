const Note = require("../models/Note");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    // allow optional query filters: category, classLevel, search
    const { category, classLevel, search } = req.query;
    // build query using $and to combine multiple optional filters
    const conditions = [];

    if (category) {
      // match requested category or missing category
      conditions.push({
        $or: [{ category }, { category: { $exists: false } }],
      });
    }

    if (classLevel) {
      conditions.push({
        $or: [{ classLevel }, { classLevel: { $exists: false } }],
      });
    }

    if (search) {
      const term = search.trim();
      if (term.length) {
        conditions.push({
          $or: [
            { title: { $regex: term, $options: "i" } },
            { subject: { $regex: term, $options: "i" } },
          ],
        });
      }
    }

    const filter = conditions.length > 0 ? { $and: conditions } : {};

    let notes = await Note.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    // sign URLs if necessary
    notes = notes.map((note) => {
      const obj = note.toObject();
      if (obj.attachments) {
        obj.attachments = obj.attachments.map((file) => {
          if (file.public_id) {
            const signed = cloudinary.url(file.public_id, {
              resource_type: file.resource_type || "auto",
              sign_url: true,
            });
            return { ...file, url: signed };
          }
          return file;
        });
      }
      return obj;
    });
    res.json(notes);
  } catch (err) {
    console.error("GET NOTES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/notes

exports.createNote = async (req, res) => {
  try {
    const { title, subject, content, category, classLevel } = req.body;
    if (!title || !subject || !content || !category || !classLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const attachments = [];

    if (req.files && req.files.length > 0) {
      // upload each file to Cloudinary
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "education_notes",
              resource_type: "auto",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(file.buffer);
        });

        attachments.push({
          originalName: file.originalname,
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }

    const note = await Note.create({
      title,
      subject,
      content,
      category,
      classLevel,
      attachments,
      createdBy: req.user?.id,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("CREATE NOTE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Remove files from Cloudinary if we stored public_id
    if (note.attachments && note.attachments.length > 0) {
      for (const file of note.attachments) {
        if (file.public_id) {
          try {
            await cloudinary.uploader.destroy(file.public_id, {
              resource_type: file.resource_type || "auto",
            });
          } catch (e) {
            console.warn("Cloudinary delete error", e);
          }
        }
      }
    }

    await Note.deleteOne({ _id: id });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("DELETE NOTE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subject, content, category, classLevel } = req.body;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (title) note.title = title;
    if (subject) note.subject = subject;
    if (content) note.content = content;
    if (category) note.category = category;
    if (classLevel) note.classLevel = classLevel;

    // handle new file uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "education_notes",
              resource_type: "auto",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(file.buffer);
        });

        note.attachments.push({
          originalName: file.originalname,
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }

    await note.save();
    res.json(note);
  } catch (err) {
    console.error("UPDATE NOTE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};