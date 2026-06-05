import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateQuantity,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", getCart);
cartRouter.put("/update", updateQuantity);
cartRouter.delete("/remove", removeCartItem);
cartRouter.delete("/clear/:userId", clearCart);

export default cartRouter;
