import express from 'express';
import * as classController from '../controllers/class.controller'
import { AdminChecker } from '../middlewares/isUserAnAdmin.middleware';
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/', TokenValidation, classController.getClasses);
router.post('/join', TokenValidation, classController.joinClass);
router.delete('/join/:classId', TokenValidation, classController.removeUserFromClass);
router.post('/:classId', TokenValidation, AdminChecker, classController.addClass);
// router.put('/:classId', TokenValidation, classController.updateClass);
router.delete('/:classId', TokenValidation, AdminChecker, classController.removeClass);

export default router;
