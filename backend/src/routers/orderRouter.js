import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  verifyPayment,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.post("/verifyPayment", verifyPayment);
OrderRouter.get("/getOrder/:userId", getOrder);
OrderRouter.get("/getAllOrders", getAllOrders);

export default OrderRouter;
