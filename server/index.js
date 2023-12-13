import express from "express";
import { config } from 'dotenv';
import { connectDB } from "./data/database.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.js";
import jobRouter from "./routes/job.js";

export const app = express();
config({
    path: "./data/config.env"
});
connectDB();

// Middleware
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'Active',
        message: 'Server is healthy and running.',
    });
});

// Use routers
app.use('/user', userRouter);
app.use('/job', jobRouter);

// Error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
});
