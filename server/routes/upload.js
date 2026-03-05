const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "education_uploads",
            resource_type: "auto", // Handles PDF + Image automatically
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        stream.end(req.file.buffer);
      });
    };

    const result = await streamUpload();

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
      type: result.resource_type,
    });

  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

module.exports = router;