import express from "express";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

    res.status(201).json({
      status: "Success",
      message: "User Register successfully",
      createdUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

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
    if (req.file) fs.unlinkSync(req.file.path);
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

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

    let finalPassword = user.password;

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      finalPassword = await bcrypt.hash(password, salt);
    }

    let imagePath = user.profileImg;

    if (req.file) {
      imagePath = `/uploads/avatars/${req.file.filename}`;

      if (user.profileImg) {
        const oldImagePath = path.resolve(`public${user.profileImg}`);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: finalPassword,
        phone,
        profileImg: imagePath,
        address,
        role,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);

    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
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
