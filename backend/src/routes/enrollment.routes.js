import express from "express";
import { createEnrollment } from "../controllers/enrollment.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Solo admin puede crear enrollments
router.post("/", verifyToken, createEnrollment);

export default router;
