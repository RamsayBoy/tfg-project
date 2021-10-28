import express from 'express';
import * as authController from '../controllers/auth.controller'
import { AdminChecker } from '../middlewares/isUserAnAdmin.middleware';
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.post('/register', TokenValidation, AdminChecker, authController.register);
router.post('/login', authController.login);

export default router;
