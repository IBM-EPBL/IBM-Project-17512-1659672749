import * as mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
  },
  topic: {
    required: true,
    type: String,
  },
  language: {
    type: String,
  },
  question: {
    required: true,
    type: String,
  },
  options: {
    type: Array,
  },
  answer: {
    required: true,
    type: String,
  },
});
