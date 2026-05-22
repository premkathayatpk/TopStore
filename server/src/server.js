import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connect from "./config/db.js";
import { productRouter } from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

const dotenv = configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

connect();

//API
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  try {
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting server: ", error);
  }
});
