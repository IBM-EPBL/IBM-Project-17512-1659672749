"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateSchema = void 0;
const mongoose = require("mongoose");
exports.CorporateSchema = new mongoose.Schema({
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
        minlength: 10,
    },
    company_name: {
        type: String,
        required: true,
        unique: true,
    },
    company_website: {
        type: String,
    },
    company_logo: {
        type: String,
    },
    company_address: {
        type: String,
    },
    about: {
        type: String,
    },
    why_us: {
        type: String,
    },
    employees: {
        type: String,
    },
    is_steps_completed: {
        type: Boolean,
        default: false,
    },
});
//# sourceMappingURL=corporate.schema.js.map