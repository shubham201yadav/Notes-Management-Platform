const Note = require("../models/Note");
const https = require("https");
const http = require("http");
const path = require("path");
const cloudinary = require("../config/cloudinary");

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

    // For PDF attachments, provide a signed URL so delivery works even when
    // Cloudinary PDF delivery restrictions are enabled.
    notes = notes.map((note) => {
      const obj = note.toObject();
      if (Array.isArray(obj.attachments)) {
        obj.attachments = obj.attachments.map((file) => {
          const isPdf = file?.mimetype === "application/pdf";
          if (isPdf && file.public_id) {
            const ext = path.extname(file.originalName || "").replace(".", "") || "pdf";
            try {
              const signedPdfUrl = cloudinary.utils.private_download_url(
                file.public_id,
                ext,
                {
                  resource_type: file.resource_type || "raw",
                  type: "upload",
                  expires_at: Math.floor(Date.now() / 1000) + 3600,
                  attachment: false,
                }
              );
              return { ...file, url: signedPdfUrl };
            } catch (e) {
              return file;
            }
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
    if (!title || !subject || !category || !classLevel) {
      return res
        .status(400)
        .json({ message: "Topic, Subject, Category and Class/Level are required" });
    }

    const attachments = [];

    if (req.files && req.files.length > 0) {
      // upload each file to Cloudinary
      for (const file of req.files) {
        const uploadResourceType = file.mimetype === "application/pdf" ? "raw" : "image";

        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "education_notes",
              resource_type: uploadResourceType,
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
      content: content || "",
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
    const { title, subject, content, category, classLevel, removeAttachmentIndexes } = req.body;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (title !== undefined) note.title = title;
    if (subject !== undefined) note.subject = subject;
    if (content !== undefined) note.content = content;
    if (category !== undefined) note.category = category;
    if (classLevel !== undefined) note.classLevel = classLevel;

    if (!Array.isArray(note.attachments)) {
      note.attachments = [];
    }

    // Remove selected old attachments when editing.
    if (removeAttachmentIndexes !== undefined) {
      let indexes = [];

      if (Array.isArray(removeAttachmentIndexes)) {
        indexes = removeAttachmentIndexes.map((v) => Number(v));
      } else if (typeof removeAttachmentIndexes === "string") {
        try {
          const parsed = JSON.parse(removeAttachmentIndexes);
          if (Array.isArray(parsed)) {
            indexes = parsed.map((v) => Number(v));
          }
        } catch (e) {
          indexes = removeAttachmentIndexes
            .split(",")
            .map((v) => Number(v.trim()));
        }
      }

      const uniqueIndexes = [...new Set(indexes)]
        .filter((idx) => Number.isInteger(idx) && idx >= 0 && idx < note.attachments.length)
        .sort((a, b) => b - a);

      for (const idx of uniqueIndexes) {
        const file = note.attachments[idx];
        if (file?.public_id) {
          try {
            await cloudinary.uploader.destroy(file.public_id, {
              resource_type: file.resource_type || "auto",
            });
          } catch (e) {
            console.warn("Cloudinary delete error", e);
          }
        }
        note.attachments.splice(idx, 1);
      }
    }

    // handle new file uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResourceType = file.mimetype === "application/pdf" ? "raw" : "image";

        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "education_notes",
              resource_type: uploadResourceType,
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

// GET /api/notes/:id/attachments/:index/download
exports.downloadAttachment = async (req, res) => {
  try {
    const { id, index } = req.params;
    const attachmentIndex = Number(index);

    if (!Number.isInteger(attachmentIndex) || attachmentIndex < 0) {
      return res.status(400).json({ message: "Invalid attachment index" });
    }

    const note = await Note.findById(id).lean();
    if (!note) return res.status(404).json({ message: "Note not found" });

    const file = note.attachments?.[attachmentIndex];
    if (!file) return res.status(404).json({ message: "Attachment not found" });

    const isPdf =
      file?.mimetype === "application/pdf" ||
      path.extname(file?.originalName || "").toLowerCase() === ".pdf";

    let sourceUrl = file.url;
    if (isPdf && file.public_id) {
      const ext = path.extname(file.originalName || "").replace(".", "") || "pdf";
      sourceUrl = cloudinary.utils.private_download_url(file.public_id, ext, {
        resource_type: file.resource_type || "raw",
        type: "upload",
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        attachment: false,
      });
    }

    if (!sourceUrl) {
      return res.status(400).json({ message: "Attachment URL is missing" });
    }

    const safeName = (file.originalName || `attachment-${attachmentIndex + 1}`)
      .replace(/[\r\n"]/g, "_")
      .trim();

    res.setHeader("Content-Disposition", `attachment; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(safeName)}`);
    if (file.mimetype) {
      res.setHeader("Content-Type", file.mimetype);
    }

    const client = sourceUrl.startsWith("https") ? https : http;
    client
      .get(sourceUrl, (upstream) => {
        if (upstream.statusCode && upstream.statusCode >= 400) {
          res.status(502).json({ message: "Unable to download attachment" });
          upstream.resume();
          return;
        }

        if (!file.mimetype && upstream.headers["content-type"]) {
          res.setHeader("Content-Type", upstream.headers["content-type"]);
        }

        upstream.pipe(res);
      })
      .on("error", (err) => {
        console.error("DOWNLOAD ATTACHMENT ERROR:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "Failed to download attachment" });
        }
      });
  } catch (err) {
    console.error("DOWNLOAD ATTACHMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};