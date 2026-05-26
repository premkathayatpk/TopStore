import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { uploadProduct } from "../middlewares/uploadFile.js";

export const productRouter = express.Router();

productRouter.post(
  "/create",
  uploadProduct.single("productImg"),
  createProduct,
);

productRouter.get("/getAll", getAllProduct);
productRouter.get("/get/:id", getProduct);

productRouter.put(
  "/update/:id",
  uploadProduct.single("productImg"),
  updateProduct,
);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.delete("/deleteAll", deleteAllProducts);
