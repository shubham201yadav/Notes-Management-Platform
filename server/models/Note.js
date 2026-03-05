const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["school", "college"],
      required: true,
    },
    classLevel: {
      type: String,
      required: true,
    },
    attachments: [
      {
        originalName: String,
        url: String,
        public_id: String,
        resource_type: String,
        mimetype: String,
        size: Number,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
