import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  profileImg: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
