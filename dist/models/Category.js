"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { id: false });
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
//export the model
exports.default = (0, mongoose_1.model)("Category", categorySchema);
