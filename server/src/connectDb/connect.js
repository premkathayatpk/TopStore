import mongoose from "mongoose";
import { configDotenv } from "dotenv";
const dotenv = configDotenv();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TopStore";

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Successfully connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connect;
