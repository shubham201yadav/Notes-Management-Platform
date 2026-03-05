const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/notesController");

// file size limit and type checking are already handled by upload middleware
router.get("/", getNotes);
router.post("/", upload.array("files", 5), createNote);
router.put("/:id", upload.array("files", 5), updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
