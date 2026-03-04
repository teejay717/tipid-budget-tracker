import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const user = await User.create({
            email,
            name,
            password
        })

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













