"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSchema = void 0;
const mongoose = require("mongoose");
exports.QuizSchema = new mongoose.Schema({
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
//# sourceMappingURL=quiz.schema.js.map