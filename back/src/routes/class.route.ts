import express from 'express';
import * as classesController from '../controllers/classes.controller'

const router = express.Router();

router.get('/classes', classesController.getClasses);

export default router;
