import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res) => {
    let token; 

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split('')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    
}