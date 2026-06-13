import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connect from "./config/db.js";
import cookieParser from "cookie-parser";
import { productRouter } from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import cartRouter from "./routers/cartRouter.js";
import OrderRouter from "./routers/orderRouter.js";
import { MessageRouter } from "./routers/messageRouter.js";

const dotenv = configDotenv();

const app = express();

//setting
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());

//cookie parser
app.use(cookieParser());

connect();

//API
app.use("/uploads/avatars", express.static("public/uploads/avatars"));
app.use("/uploads/products", express.static("public/uploads/products"));

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", OrderRouter);
app.use("/api/message", MessageRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  try {
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting server: ", error);
  }
});
