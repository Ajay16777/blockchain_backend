import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import Admin from "../models/Admin";
import axios from "axios";
import * as Bcrypt from "bcrypt";
import { body } from "express-validator";

export class AdminController {
  // signup
  static signup = async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newAdmin.save();
    const token = Jwt.sign(
      { _id: newAdmin._id },
      getEnvironmentVariables().jwt_secret,
      {
        expiresIn: "1d",
      }
    );
    return res.status(201).json({
      message: "Admin Created Successfully",
      token,
      newAdmin,
    });
  };
  // login
  static login = async (req, res, next) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin Not Found",
      });
    }
    const isMatch = await Bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const token = Jwt.sign(
      { _id: admin._id },
      getEnvironmentVariables().jwt_secret,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      message: "Admin Logged In Successfully",
      token,
      admin,
    });
  };
  // update
  static updateAdmin = async (req, res, next) => {
    try {
      let adminId = req.admin._id;
      const data = req.body;
      const admin = await Admin.findByIdAndUpdate(adminId, data);
      return res.status(200).json({
        message: "Admin Updated Successfully",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  // delete
  static deleteAdmin = async (req, res, next) => {
    try {
      let adminId = req.admin._id;
      const admin = await Admin.findByIdAndDelete(adminId);
      return res.status(200).json({
        message: "Admin Deleted Successfully",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  //   getAdminData
  static getAdminData = async (req, res, next) => {
    try {
      let adminId = req.admin._id;
      const admin = await Admin.findById(adminId);
      return res.status(200).json({
        message: "Admin Data",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
}
