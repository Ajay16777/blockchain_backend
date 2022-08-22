"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { id: false });
adminSchema.set("toObject", { virtuals: true });
adminSchema.set("toJSON", { virtuals: true });
//export the model
exports.default = (0, mongoose_1.model)("Admin", adminSchema);
