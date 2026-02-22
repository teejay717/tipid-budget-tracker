import express from 'express';
const router = express.Router();

import { getCategories, addCategory, deleteCategory } from '../controllers/category.js';

router.get('/', getCategories)

router.post('/', addCategory)

router.delete('/:id', deleteCategory)

export default router;