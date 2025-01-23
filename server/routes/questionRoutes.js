import express from 'express';
import { createQuestion, getQuestions } from '../controllers/questionController.js';

const router = express.Router();

router.post('/create', createQuestion);
router.get('/all', getQuestions);

export default router;
