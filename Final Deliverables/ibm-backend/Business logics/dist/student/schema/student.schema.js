"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = void 0;
const mongoose = require("mongoose");
exports.StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: String,
        maxlength: 13,
        required: true,
        minlength: 10,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    device_id: {
        type: String,
        required: true,
    },
    completed_quizzes: {
        type: Array,
    },
    skills: {
        type: [],
    },
    _skills_private: {
        type: Array,
    },
    profile: {
        Type: Array,
    },
    projects: {
        type: Array,
    },
    education: {
        type: Array,
    },
    experience_level: {
        type: Number,
    },
    location: {
        type: String,
    },
    is_steps_completed: {
        type: Boolean,
        default: false,
    },
    hackerrank_data: {
        type: Map,
    },
    leetcode_data: {
        type: Map,
    },
    recommended_jobs: {
        type: [mongoose.Types.ObjectId],
        ref: 'Job',
    },
});
//# sourceMappingURL=student.schema.js.map