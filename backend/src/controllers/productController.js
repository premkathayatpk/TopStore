import express from "express";
import Product from "../models/productModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload an image using the field name 'productImg'",
      });
    }

    const ImageFileName = req.file.filename;

    const savedProduct = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      productImg: ImageFileName,
    });

    res.status(201).json({
      status: "success",
      Message: "Product created successfully",
      savedProduct,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Error creating product: ", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ status: "fail", message: messages[0] });
    }

    res.status(500).json({
      status: "Error creating product",
      message: "Server error",
      error: error.message,
    });
  }
};

// Fetching all product

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success ",
      message: "Fetched all products successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({
      status: "Error ",
      message: "Server error",
      error: error.message,
    });
  }
};

// Fetching product by id

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "No product found with that ID",
      });
    }

    res.status(200).json({
      status: "success ",
      message: "Fetched  product successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching  product:", error);
    res.status(500).json({
      status: "Error ",
      message: "Server error",
      error: error.message,
    });
  }
};

// update product by id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res
        .status(404)
        .json({ status: "fail", message: "No product found with that ID" });
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    if (req.file) {
      const oldImagePath = product.productImg;
      product.productImg = `/uploads/products/${req.file.filename}`;

      if (oldImagePath) {
        const absoluteOldPath = path.resolve(`public${oldImagePath}`);
        if (fs.existsSync(absoluteOldPath)) fs.unlinkSync(absoluteOldPath);
      }
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      status: "success",
      message: "Product update successfully",
      updatedProduct,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Error updation product:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ status: "fail", message: messages[0] });
    }

    res
      .status(500)
      .json({ status: "error", message: "Server Error", error: error.message });
  }
};

// Delete product by id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "fail", message: "No Product found with that ID" });
    }
    if (deletedProduct.productImg) {
      const absoluteImagePath = path.resolve(
        `public${deletedProduct.productImg}`,
      );
      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully.",
      deletedProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "error",
      message: "Fail to delete product",
      error: error.message,
    });
  }
};

// Delete all product
export const deleteAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, "productImg");

    const result = await Product.deleteMany({});

    products.forEach((product) => {
      if (product.productImg) {
        const absoluteImagePath = path.resolve(`public${product.productImg}`);
        if (fs.existsSync(absoluteImagePath)) {
          fs.unlinkSync(absoluteImagePath);
        }
      }
    });

    res.status(200).json({
      status: "success",
      message: "All Product deleted successfully.",
      count: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all products:", error);
    res.status(500).json({
      status: "error",
      message: "Fail to delete All product",
      error: error.message,
    });
  }
};
