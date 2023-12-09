import express from "express"
import { config } from 'dotenv';
import { connectDB } from "./data/database.js";

export const app = express();
config({
    path: "./data/config.env"
})
connectDB()
//Middleware
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'Active',
        message: 'Server is healthy and running.',
    });
});

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is working on port : ${port}`)
})