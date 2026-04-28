import express from 'express';
import{
    getAllProjectsHandler,
    getProjectByIdHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler,
} from '../controllers/projectController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeProjectOwnership } from '../middleware/authorizeProjectOwnership.js';
import{
    validateId,
    validateCreateProject,
    validateUpdateProject
}from '../middleware/projectValidators.js';

const router = express.Router();
router.use(authenticate);
router.get('/',getAllProjectsHandler);

router.get('/:id',validateId,getProjectByIdHandler);
router.post('/',validateCreateProject,createProjectHandler);

router.put(
    '/:id',
    validateId,
    authorizeProjectOwnership,
    validateUpdateProject,
    updateProjectHandler
);

router.delete(
    '/:id',
    validateId,
    authorizeProjectOwnership,
    deleteProjectHandler
);
export default router;
