import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';

import { getCategories, addCategory, deleteCategory, editCategory } from '../controllers/category.js';

router.get('/', protect, getCategories)

router.post('/', protect, addCategory)

router.delete('/:id', protect, deleteCategory)

router.put('/:id', protect, editCategory)

export default router;