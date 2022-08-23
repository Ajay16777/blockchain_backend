import * as mongoose from "mongoose";
import { model } from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Nfts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nft",
      },
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { id: false }
);

collectionSchema.set("toObject", { virtuals: true });

collectionSchema.set("toJSON", { virtuals: true });

//export the model
export default model("Collection", collectionSchema);
