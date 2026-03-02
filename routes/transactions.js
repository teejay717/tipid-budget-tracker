import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';

import { getTransactions, addTransaction, deleteTransaction, clearTransactions, editTransaction } from '../controllers/transactions.js';

// get all transactions
router.get('/', protect, getTransactions)

// add single transaction
router.post('/', protect, addTransaction)

// delete single transaction
router.delete('/:id', protect, deleteTransaction)

// delete all
router.delete('/', protect, clearTransactions)

// edit transaction
router.put('/:id', protect, editTransaction)

export default router;