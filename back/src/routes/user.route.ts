import express from 'express';
import * as userController from '../controllers/user.controller'
import { AdminChecker } from '../middlewares/isUserAnAdmin.middleware';
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/getUser', TokenValidation, userController.getUser);
router.get('/getClients', TokenValidation, AdminChecker, userController.getClients);

export default router;
