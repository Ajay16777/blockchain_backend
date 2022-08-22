import * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    wishlist: { type: Array, required: true },
    cart: { type: Array, required: true },
    IsVerified: { type: Boolean, required: true, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { id: false }
);
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

export default model('users', userSchema);

