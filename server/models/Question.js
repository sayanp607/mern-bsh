import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true }, // Index of the correct option (0-3)
});

export default mongoose.model('Question', questionSchema);
