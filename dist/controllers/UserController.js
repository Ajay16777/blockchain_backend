"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const User_1 = require("../models/User");
const Bcrypt = require("bcrypt");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
// signup
UserController.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone } = req.body;
    const salt = yield Bcrypt.genSalt(10);
    const hashedPassword = yield Bcrypt.hash(password, salt);
    const newUser = new User_1.default({
        name,
        email,
        password: hashedPassword,
        phone,
    });
    yield newUser.save();
    const token = Jwt.sign({ _id: newUser._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, {
        expiresIn: "1d",
    });
    return res.status(201).json({
        message: "User Created Successfully",
        token,
        newUser,
    });
});
// login
UserController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
        });
    }
    const isMatch = yield Bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid Password",
        });
    }
    const token = Jwt.sign({ _id: user._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, {
        expiresIn: "1d",
    });
    return res.status(200).json({
        message: "User Logged In Successfully",
        token,
        user,
    });
});
//get user data
UserController.userData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    return res.status(200).json({
        message: "User Data",
        user,
    });
});
//update user data
UserController.updateUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndUpdate(req.user._id, req.body);
    return res.status(200).json({
        message: "User Data Updated Successfully",
        user,
    });
});
//delete user data
UserController.deleteUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndDelete(req.user._id);
    return res.status(200).json({
        message: "User Data Deleted Successfully",
        user,
    });
});
