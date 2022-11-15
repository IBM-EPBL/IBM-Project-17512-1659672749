"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackathonSchema = void 0;
const mongoose = require("mongoose");
exports.hackathonSchema = new mongoose.Schema({
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
//# sourceMappingURL=hackathon.schema.js.map