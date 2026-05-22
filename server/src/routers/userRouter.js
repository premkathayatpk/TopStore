import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { uploadAvatar } from "../middlewares/uploadFile.js";

const userRouter = express.Router();

userRouter.post("/register", uploadAvatar.single("profileImg"), createUser);

userRouter.get("/getUser/:id", getUser);

userRouter.get("/getAllUsers", getAllUsers);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.put(
  "/updateUser/:id",
  uploadAvatar.single("profileImg"),
  updateUser,
);

export default userRouter;
