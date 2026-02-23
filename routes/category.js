import express from 'express';
const router = express.Router();

import { getCategories, addCategory, deleteCategory, editCategory } from '../controllers/category.js';

router.get('/', getCategories)

router.post('/', addCategory)

router.delete('/:id', deleteCategory)

router.put('/:id', editCategory)

export default router;