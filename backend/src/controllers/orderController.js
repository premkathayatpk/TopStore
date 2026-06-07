import express from "express";
import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, subtotal, shipping, total, transaction_uuid } =
      req.body;

    if (!userId || !items || items.length === 0 || !transaction_uuid) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or cart items are empty.",
      });
    }

    const newOrder = new Order({
      user: userId,
      items: items,
      subtotal: subtotal,
      shippingCharge: shipping,
      totalAmount: total,
      transaction_uuid: transaction_uuid,
      paymentStatus: "pending",
      orderStatus: "processing",
    });

    const order = await newOrder.save();

    res.status(201).json({
      status: "success",
      success: true,
      message: "Pending order initialized successfully",
      order,
    });
  } catch (error) {
    console.error("Order Generation Error Context:", error);
    res.status(500).json({
      status: "error",
      success: false,
      message: "Unable to create Order",
    });
  }
};
