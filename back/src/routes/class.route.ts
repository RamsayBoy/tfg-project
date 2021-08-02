import express from 'express';
import * as classController from '../controllers/class.controller'
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/', TokenValidation, classController.getClasses);
router.post('/join', TokenValidation, classController.joinClass);
router.delete('/join/:classId', TokenValidation, classController.removeUserFromClass);

export default router;
