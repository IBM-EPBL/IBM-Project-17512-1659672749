"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsSchema = void 0;
const mongoose = require("mongoose");
exports.SkillsSchema = new mongoose.Schema({
    skill: {
        type: String,
        unique: true,
    },
});
//# sourceMappingURL=Skills.schema.js.map