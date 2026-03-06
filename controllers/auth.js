import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Category from "../models/Category.js";

export const register = async (req, res) => {
    try {
        const defaultCategories = [
        { text: 'Food', color: '#f97316' },
        { text: 'Transportation', color: '#22c55e' },
        { text: 'Miscellaneous', color: '#64748b' },
    ];

        const { email, name, password } = req.body;

        const user = await User.create({
            email,
            name,
            password
        })
        
        for (const category of defaultCategories) {
            await Category.create({
                user: user._id,
                text: category.text,
                color: category.color,
            });
        }

        const token = user.getSignedJwtToken();

        return res.status(201).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


export const login = async (req, res) => {
try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await user.matchPassword(password)

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = user.getSignedJwtToken();
        return res.status(200).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}













