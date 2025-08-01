import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorHandler } from '../utils/error.js';

export const protect = async (req, res, next) => {
    let token;
    // Set token from Bearer token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
    }

// I could also get token from cookies if I set that way
    // if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    if (!token) {
        return res.status(401).json({ msg: 'Not authorized, no token' });
    }
        try {
            // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user (excluding password)
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return next(new ErrorResponse('User not found for this token', 404));
        }
        next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ msg: 'Not authorized, token failed' });
        }


};


// Grant access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(errorHandler(403, `User role ${req.user.role} is not authorized`)
            );
        }
        next();
    };
};
