import {body, param} from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateTaskId = [
    param('id')
    .isInt({min:1})
    .withMessage('The provided ID is not a valid positive integer'),
    handleValidationErrors,
];

export const validateCreateTask = [
    body('description')
    .trim()
    .exists({values:'falsy'})
    .withMessage('Description is required'),
    body('projectId')
    .isInt({min:1})
    .withMessage('A valid Project ID is required'),
    handleValidationErrors,
];

export const validateUpdateTask = [
    body('description')
    .optional()
    .trim(),
    body('is_completed')
    .optional()
    .isBoolean()
    .withMessage('is_completed must be true or false'),
    handleValidationErrors,
];