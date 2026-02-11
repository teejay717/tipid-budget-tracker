import express from 'express';
const router = express.Router();

import Transaction from '../models/Transaction.js';

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        // do this to check if there is an input ( Input Validation )
        const { text, amount } = req.body; // this is what we expect to receive from the user
        if (!text || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Please provide text and amount'
            })
        }

        // this is what creates the data in mongodb
        const transaction = await Transaction.create(req.body); // always send the request inside the create function to POST
        return res.status(201).json({
            success: true,
            data: transaction 
        })
    } catch (error) {
        console.log(error);
        // this logs the error, and checks if the error is Validation Error so it means that the fields arent filled properly.
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Please fill in all require fields'
            })
        }
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
})

export default router;