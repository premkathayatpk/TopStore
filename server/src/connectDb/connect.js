import mongoose from "mongoose";

const connect = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/TopStore");
    console.log("MongoDb connected successfully.");
  } catch (error) {
    console.log("Fail to connect to MongoDb : ", error);
  }
};

export default connect;
