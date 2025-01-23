import express from "express";
import { createNote, getNotes, deleteNote } from "../controllers/noteController.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

// Route to create a new note
router.post("/create", uploadFiles, createNote);

// Route to get all notes
router.get("/:courseId", getNotes);

// Route to delete a note by ID
router.delete("/delete/:id", deleteNote);

export default router;
