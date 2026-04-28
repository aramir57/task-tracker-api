import {body, param} from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
    param('id')
    .isInt({min:1})
    .withMessage('The provided Id is not a valid positive integer'),
    handleValidationErrors,
];

export const validateCreateProject = [
    body('title')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .isLength({ max:100 })
    .withMessage('Title cannot exceed 100 characters'),
    handleValidationErrors,
];

export const validateUpdateProject = [
    body('title')
    .optional()
    .trim()
    .isLength({max: 100})
    .withMessage('Title cannot exceed 100 characters'),
    handleValidationErrors,
];

