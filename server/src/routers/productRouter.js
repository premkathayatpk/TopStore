import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

export const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/all", getAllProduct);
productRouter.get("/find/:id", getProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.delete("/deleteAll", deleteAllProducts);
