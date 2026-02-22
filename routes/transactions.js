import express from 'express';
const router = express.Router();

import Transaction from '../models/Transaction.js';
import { getTransactions, addTransaction, deleteTransaction, clearTransactions, editTransaction } from '../controllers/transactions.js';

// get all transactions
router.get('/', getTransactions)

// add single transaction
router.post('/', addTransaction)

// delete single transaction
router.delete('/:id', deleteTransaction)

// delete all
router.delete('/', clearTransactions)

// edit transaction
router.put('/:id', editTransaction)

export default router;