import express from "express"
import { config } from 'dotenv';



export const app = express();
config({
    path: "./data/config.env"
})
//Middleware
app.use(express.json())

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is working on port : ${port}`)
})