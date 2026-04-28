import express from 'express';
import { signupHandler, loginHandler } from '../controllers/authController.js';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';

const router = express.Router();

router.post('/signup', validateSignUp, signupHandler);
router.post('/login', validateLogIn, loginHandler);

export default router;