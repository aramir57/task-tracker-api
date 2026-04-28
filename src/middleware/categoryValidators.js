import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCategoryId = [
    param('id')
    .isInt({min:1})
    .withMessage('The provided ID is not a valid positive integer'),
    handleValidationErrors,

];

export const validateCategoryBody = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is missing'),
    handleValidationErrors,
];