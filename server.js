import express from 'express';
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;

import transactions from './routes/transactions.js'
import category from './routes/category.js'
import auth from './routes/auth.js'

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//transactions
app.use('/api/transactions', transactions)

// categories
app.use('/api/categories', category)

app.use('/api/auth', auth)

app.get('/', (req, res) => {
    res.json({msg: 'Budget Tracker Backend is running!'});
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));