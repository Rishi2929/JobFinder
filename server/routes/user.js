import express from "express";
import { Login, Register } from "../controllers/user.js";

// User routes
const userRouter = express.Router();
userRouter.post('/register', Register);
userRouter.post('/login', Login);

export default userRouter;
