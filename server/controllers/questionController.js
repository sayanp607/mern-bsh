import Question from '../models/Question.js';

// Create a question
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctOption } = req.body;
    if (options.length !== 4) {
      return res.status(400).json({ message: 'There must be exactly 4 options.' });
    }
    const newQuestion = new Question({ question, options, correctOption });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
