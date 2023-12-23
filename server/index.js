import express from "express";
import { config } from 'dotenv';
import { connectDB } from "./data/database.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.js";
import jobRouter from "./routes/job.js";
import cors from 'cors';


export const app = express();
config({
    path: "./data/config.env"
});
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'Active',
        message: 'Server is healthy and running.',
    });
});

// Use routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);

app.use((req, res, next) => {
    res.status(404).send("Not Found ");
});

// Error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
});