import express from "express";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//============= CREATE USER =====================

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message:
          "Please upload a profile image using the field name 'profileImg'",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imagePath = `/uploads/avatars/${req.file.filename}`;

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      profileImg: imagePath,
      address,
      role,
    });

    const token = generateToken(createdUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    createdUser.password = undefined;

    res.status(201).json({
      status: "Success",
      message: "User Register successfully",
      user: createdUser,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error(error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: "Validation error",
        errors: messages[0],
      });
    }

    res.status(500).json({
      status: "Error",
      message: "Server error",
      error: error.message,
    });
  }
};

//============= GET USER =====================

export const getUser = async (req, res) => {
  try {
    // const { id } = req.params;

    // const user = await User.findById(id).select("-password");
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "No User found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

// ============= GET ALL USERS ==================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "No Users found " });
    }
    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

// ============= DELETE USER ==================

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "No User found with that ID" });
    }

    if (deletedUser.profileImg) {
      const absoluteImagePath = path.resolve(`public${deletedUser.profileImg}`);

      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }
    deletedUser.password = undefined;

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

// ============= UPDATE USER ==================

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, address, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res
        .status(404)
        .json({ status: "error", message: "No User found with that ID" });
    }

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({
          status: "fail",
          message: "Password must be at least 6 characters",
        });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      const oldImagePath = user.profileImg;

      user.profileImg = `/uploads/avatars/${req.file.filename}`;

      if (oldImagePath) {
        const absoluteOldPath = path.resolve(`public${oldImagePath}`);
        if (fs.existsSync(absoluteOldPath)) {
          fs.unlinkSync(absoluteOldPath);
        }
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (role) user.role = role;

    const updatedUser = await user.save();

    updatedUser.password = undefined;

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);

    console.error(error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: messages[0],
      });
    }

    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

//Login ------------------------------

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide both email and password",
      });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImg: user.profileImg,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

//Logout -------------------------------------

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      status: "success",
      message: "Logout Successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};
