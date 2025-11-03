// routes/teacherRoutes.js
import express from 'express';
import { getStudentClasses } from '../controllers/student.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// El docente ve solo sus clases
router.get('/classes', authMiddleware, getStudentClasses);

export default router;
