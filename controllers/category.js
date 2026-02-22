import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
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
}

export const addCategory = async (req, res) => {
    try {
        const {text, color} = req.body;
        if (!text || !color) {
            return res.status(400).json({
                success: false,
                error: 'Please add a category and color!'
            })
        }

        const category = await Category.create(req.body);
        return res.status(201).json({
            success: true,
            data: category
        })

    } catch (error) {
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
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                msg: 'Category not found!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted category'
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

