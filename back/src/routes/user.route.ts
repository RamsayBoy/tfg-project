import express from 'express';
import * as userController from '../controllers/user.controller'
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/getUser', TokenValidation, userController.getUser);

export default router;
