import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import User from "../models/User";
import axios from "axios";
import * as Bcrypt from "bcrypt";
import { body } from "express-validator";

export class UserController {
  // signup
  static signup = async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();
    const token = Jwt.sign(
      { _id: newUser._id },
      getEnvironmentVariables().jwt_secret,
      {
        expiresIn: "1d",
      }
    );
    return res.status(201).json({
      message: "User Created Successfully",
      token,
      newUser,
    });
  };

  // login
  static login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    const isMatch = await Bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const token = Jwt.sign(
      { _id: user._id },
      getEnvironmentVariables().jwt_secret,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      message: "User Logged In Successfully",
      token,
      user,
    });
  };

  //get user data
  static userData = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      message: "User Data",
      user,
    });
  };

  //update user data
  static updateUserData = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body);
    return res.status(200).json({
      message: "User Data Updated Successfully",
      user,
    });
  };

  //delete user data
  static deleteUserData = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({
      message: "User Data Deleted Successfully",
      user,
    });
  };
}
