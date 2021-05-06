import express from 'express';
import * as authController from '../controllers/auth.controller'
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.post('/test', TokenValidation, authController.test);
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
