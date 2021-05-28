import express from 'express';
import * as classController from '../controllers/class.controller'
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/classes', TokenValidation, classController.getClasses);

export default router;
