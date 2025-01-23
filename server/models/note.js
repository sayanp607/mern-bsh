import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the Course model
    required: true, // Make this mandatory to ensure every note is linked to a course
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  subject: {
    type: String,
    enum: ["Mathematics", "Physics", "Chemistry"],
    required: true,
  },

});

const Note = mongoose.model("Note", noteSchema);

export default Note;
