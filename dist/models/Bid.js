"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const bidSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { id: false });
bidSchema.set("toObject", { virtuals: true });
bidSchema.set("toJSON", { virtuals: true });
//export the model
exports.default = (0, mongoose_1.model)("Bid", bidSchema);
