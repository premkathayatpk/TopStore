import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connect from "./src/connectDb/connect.js";

const dotenv = configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

connect();

app.get("/", (req, res) => {
  res.send("Welcome to the TopStore API!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
