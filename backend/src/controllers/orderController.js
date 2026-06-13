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
      totalAmount: total, // Note: saved as totalAmount
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

// payment verify
export const verifyPayment = async (req, res) => {
  const { transaction_uuid, total_amount, status } = req.body;

  try {
    const order = await Order.findOne({ transaction_uuid: transaction_uuid });
    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order records matching this transaction ID could not be found.",
      });
    }

    if (status !== "COMPLETE") {
      order.paymentStatus = "failed";
      await order.save();

      return res.status(200).json({
        success: false,
        status: "failed",
        message: `Transaction was not completed. eSewa status: ${status}`,
      });
    }

    if (Number(order.totalAmount) !== Number(total_amount)) {
      order.paymentStatus = "failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message:
          "Transaction price mismatch error. Order manipulation detected.",
      });
    }

    order.paymentStatus = "completed";
    await order.save();

    return res.status(200).json({
      success: true,
      status: "completed",
      message: "Order payment validated and captured successfully.",
    });
  } catch (error) {
    console.error("eSewa verification route crash:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Processing Error.",
    });
  }
};

// get orders by user id

export const getOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).populate(
      "items.productId",
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No orders found for this user",
      });
    }

    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders", error);
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

// get All orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No orders found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders", error);
    return res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};
