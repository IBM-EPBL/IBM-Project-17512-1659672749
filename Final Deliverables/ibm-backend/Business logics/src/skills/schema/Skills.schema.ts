import * as mongoose from 'mongoose';

export const SkillsSchema = new mongoose.Schema({
  skill: {
    type: String,
    unique: true,
  },
});
