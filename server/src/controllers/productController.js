import express from "express";
import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const savedProduct = await Product.create({
      name,
      price,
      description,
      category,
      stock,
    });

    res.status(201).json({
      status: "Success",
      Message: "Product created successfully",
      savedProduct,
    });
  } catch (error) {
    console.error("Error creating product: ", error);
    res
      .status(500)
      .json({
        status: "Error creating product",
        message: "Server error",
        error: error.message,
      });
  }
};
