import express from 'express';
import{
    getAllTasksHandler,
    getTaskByIdHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    linkCategoryHandler,
} from '../controllers/taskController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeTaskOwnership} from '../middleware/authorizeTaskOwnership.js';
import { validateTaskId,
    validateCreateTask,
    validateUpdateTask
 } from '../middleware/taskValidators.js';
import { create, update } from '../repositories/taskRepo.js';

 const router = express.Router();

 router.use(authenticate);
 router.get('/',getAllTasksHandler);
 router.get('/:id',validateTaskId,authorizeTaskOwnership, getTaskByIdHandler);
 router.post('/',validateCreateTask,createTaskHandler);
 router.put(
    '/:id',
    validateTaskId,
    authorizeTaskOwnership,
    validateUpdateTask,
    updateTaskHandler
 );
router.delete(
    '/:id',
    validateTaskId,
    authorizeTaskOwnership,
    deleteTaskHandler
);
router.post('/:id/categories', authenticate, validateTaskId, authorizeTaskOwnership, linkCategoryHandler);
export default router;