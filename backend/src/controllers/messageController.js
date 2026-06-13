import express from "express";
import Message from "../models/MessageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
    });
    return res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message", error);
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: "success",
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages", error);
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
      return res.status(404).json({
        status: "fail",
        message: "Message not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message", error);
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};
