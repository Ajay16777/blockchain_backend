"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { id: false });
collectionSchema.set("toObject", { virtuals: true });
collectionSchema.set("toJSON", { virtuals: true });
//export the model
exports.default = (0, mongoose_1.model)("Collection", collectionSchema);
