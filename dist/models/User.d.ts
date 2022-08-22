import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    password: string;
    address: string;
    name: string;
    email: string;
    phone: string;
    wishlist: any[];
    cart: any[];
    IsVerified: boolean;
    created_at: Date;
    updated_at: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    password: string;
    address: string;
    name: string;
    email: string;
    phone: string;
    wishlist: any[];
    cart: any[];
    IsVerified: boolean;
    created_at: Date;
    updated_at: Date;
}>>;
export default _default;
