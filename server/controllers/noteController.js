import Note from "../models/note.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, description, course, subject } = req.body;
    const filePath = req.file?.path; // Multer stores the file at req.file

    if (!filePath) {
      return res.status(400).json({ message: "File upload failed!" });
    }
    if (!["Mathematics", "Physics", "Chemistry"].includes(subject)) {
      return res.status(400).json({
        message: "Invalid subject. Must be one of Mathematics, Physics, or Chemistry.",
      });
    }
    const newNote = new Note({
      title,
      description,
      filePath,
      course,
      subject,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Extract courseId from request params
    const notes = await Note.find({ course: courseId }); // Filter notes by course ID
    res.status(200).json(notes); // Return filtered notes
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
};


// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};
