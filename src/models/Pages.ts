import * as mongoose from "mongoose";
import { model } from "mongoose";

const pagesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { id: false }
);

pagesSchema.set("toObject", { virtuals: true });

pagesSchema.set("toJSON", { virtuals: true });

//export the model
export default model("Pages", pagesSchema);
