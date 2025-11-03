// routes/teacherRoutes.js
import express from 'express';
import { getTeacherClasses } from '../controllers/teacher.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// El docente ve solo sus clases
router.get('/classes', authMiddleware, getTeacherClasses);

export default router;
