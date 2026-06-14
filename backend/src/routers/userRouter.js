import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/userController.js";
import { uploadAvatar } from "../middlewares/uploadFile.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", uploadAvatar.single("profileImg"), createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/getMe", protect, getUser);

userRouter.get("/getAllUsers", protect, getAllUsers);
userRouter.delete("/deleteUser/:id", protect, deleteUser);
userRouter.put(
  "/updateUser/:id",
  protect,
  uploadAvatar.single("profileImg"),
  updateUser,
);

export default userRouter;
