import express from 'express';
import * as userController from '../controllers/user.controller'
import { AdminChecker } from '../middlewares/isUserAnAdmin.middleware';
import { TokenValidation } from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.delete('/:clientId', TokenValidation, AdminChecker, userController.removeClient);
router.get('/getUser', TokenValidation, userController.getUser);
router.get('/getClients', TokenValidation, AdminChecker, userController.getClients);
router.post('/:userId', TokenValidation, userController.updateUser);
// router.post('/:userId/changePassword', TokenValidation, userController.changeUserPassword);

export default router;
