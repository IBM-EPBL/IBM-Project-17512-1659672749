import * as mongoose from 'mongoose';

export const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: String,
  },
  company: {
    type: String,
  },
  tags: {
    type: [String],
  },
});
