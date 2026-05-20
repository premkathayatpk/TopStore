import express from "express";
import {
  createProduct,
  getAllProduct,
} from "../controllers/productController.js";

export const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/getALl", getAllProduct);
