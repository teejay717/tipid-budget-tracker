import express from 'express';
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: 'Budget Tracker Backend is running!'});
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));