import express from "express";
import { createProduct } from "../controllers/productController.js";

export const productRouter = express.Router();

productRouter.post("/create", createProduct);
