import express from "express";
import { createOrder, verifyPayment } from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.post("/verifyPayment", verifyPayment);

export default OrderRouter;
