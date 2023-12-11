import express from "express"
import { config } from 'dotenv';
import { connectDB } from "./data/database.js";
import { Login, Register } from "./controllers/user.js";
import { errorMiddleware } from "./middleware/error.js";
import { newJob } from "./controllers/jobdetail.js";
import isAuthenticated from "./middleware/auth.js";


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

app.post('/register', Register)
app.post('/login', Login)
app.post('/new', isAuthenticated, newJob)



const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is working on port : ${port}`)
})
app.use(errorMiddleware)