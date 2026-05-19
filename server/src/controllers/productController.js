import express from "express";
import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, productImg, category, stock } = req.body;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
