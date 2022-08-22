"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../../models/User");
class UserValidators {
    static signup() {
        return [
            (0, express_validator_1.body)("name", "name is Required").isString(),
            (0, express_validator_1.body)("password", "password is Required").isString(),
            (0, express_validator_1.body)("email", "email Is Required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        throw new Error("User Already Exist");
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)("phone", "Phone with numeric value Is Required")
                .isNumeric()
                .isLength({ min: 10, max: 10 })
                .withMessage("Phone must be 10 digit")
                .custom((phone, { req }) => {
                return User_1.default.findOne({ phone: phone }).then((user) => {
                    if (user) {
                        throw new Error("User Already Exist");
                    }
                    else {
                        return true;
                    }
                });
            }),
        ];
    }
    static login() {
        return [
            (0, express_validator_1.body)("email", "Email is Required")
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error("User Does Not Exist");
                    }
                });
            }),
            (0, express_validator_1.body)("password", "Password is Required").isString(),
        ];
    }
}
exports.UserValidators = UserValidators;
