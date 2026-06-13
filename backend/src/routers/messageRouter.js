import express from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js";

export const MessageRouter = express.Router();

MessageRouter.post("/send", sendMessage);
MessageRouter.get("/getAllMessages", getAllMessages);
MessageRouter.delete("/deleteMessage/:messageId", deleteMessage);
