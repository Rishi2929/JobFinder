import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";

// User routes
const userRouter = express.Router();
userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.get('/logout', Logout);


export default userRouter;
