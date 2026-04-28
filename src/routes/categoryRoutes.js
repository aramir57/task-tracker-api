import express from 'express';
import * as controller from '../controllers/categoryController.js';
import * as val from '../middleware/categoryValidators.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/',authenticate,controller.getCategoriesHandler);
router.get('/:id',authenticate, val.validateCategoryId,controller.getCategoryByIdHandler);
router.post('/',authenticate,val.validateCategoryBody,controller.createCategoryHandler);
router.put('/:id',authenticate,val.validateCategoryId,val.validateCategoryBody,controller.updateCategoryHandler);
router.delete('/:id', authenticate, val.validateCategoryId, controller.deleteCategoryHandler);

export default router;