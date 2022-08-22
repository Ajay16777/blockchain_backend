import * as mongoose from "mongoose";
import { model } from "mongoose";

const nftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { id: false }
);

nftSchema.set("toObject", { virtuals: true });

nftSchema.set("toJSON", { virtuals: true });

//export the model
export default model("Nft", nftSchema);
