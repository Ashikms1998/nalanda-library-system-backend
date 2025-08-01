import { body } from 'express-validator';

export const registerValidationRules = [
    body("username")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isAlpha('en-US', { ignore: ' ' }).withMessage("Name must contain only letters and spaces")
        .isLength({ min: 2, max: 30 }).withMessage("Name must be 2 to 30 characters long"),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

export const loginValidationRules = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
];