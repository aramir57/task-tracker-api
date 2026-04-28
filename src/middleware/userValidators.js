import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignUp = [
    body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
    body('password')
    .isLength({min:8})
    .withMessage('Password must be at least 8 characters'),
    body('username')
    .notEmpty()
    .withMessage('Username is required'),
    handleValidationErrors, 
];

export const validateLogIn = [
    body('email')
    .isEmail()
    .withMessage('Valid email is required'),
    body('password')
    .exists()
    .withMessage('Password is required'),
    handleValidationErrors,
];