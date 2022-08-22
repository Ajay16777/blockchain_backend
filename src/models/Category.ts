import * as mongoose from "mongoose";
import { model } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { id: false }
);

categorySchema.set("toObject", { virtuals: true });

categorySchema.set("toJSON", { virtuals: true });

//export the model
export default model("Category", categorySchema);
