import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  verifyPayment,
} from "../controllers/orderController.js";
import protect from "../middlewares/authMiddleware.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", protect, createOrder);
OrderRouter.post("/verifyPayment", protect, verifyPayment);
OrderRouter.get("/getOrder/:userId", protect, getOrder);
OrderRouter.get("/getAllOrders", protect, getAllOrders);
OrderRouter.put("/updateStatus/:orderId", protect, updateOrderStatus); 
OrderRouter.delete("/deleteOrder/:orderId", protect, deleteOrder);

export default OrderRouter;
