import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  verifyPayment,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.post("/verifyPayment", verifyPayment);
OrderRouter.get("/getOrder/:userId", getOrder);
OrderRouter.get("/getAllOrders", getAllOrders);
OrderRouter.put("/updateStatus/:orderId", updateOrderStatus);
OrderRouter.delete("/deleteOrder/:orderId", deleteOrder);

export default OrderRouter;
