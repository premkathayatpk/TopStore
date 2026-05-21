import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../middlewares/uploadFile.js";

export const productRouter = express.Router();

productRouter.post("/create", upload.single("productImg"), createProduct);
productRouter.get("/all", getAllProduct);
productRouter.get("/find/:id", getProduct);
productRouter.put("/update/:id", upload.single("productImg"), updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.delete("/deleteAll", deleteAllProducts);
