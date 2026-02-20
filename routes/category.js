import express from 'express';
const router = express.Router();

import Category from '../models/Category.js';

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
})

export default router;