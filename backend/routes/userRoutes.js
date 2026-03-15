import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

// register user
userRouter.post("/register", registerUser);

// login user
userRouter.post("/login", loginUser);

export default userRouter;
