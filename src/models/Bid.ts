import * as mongoose from "mongoose";
import { model } from "mongoose";

const bidSchema = new mongoose.Schema(
    {
        price: { type: Number, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
        Nft : { type: mongoose.Schema.Types.ObjectId, ref: "Nft" },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
    { id: false }
);

bidSchema.set("toObject", { virtuals: true });

bidSchema.set("toJSON", { virtuals: true });

//export the model
export default model("Bid", bidSchema);
