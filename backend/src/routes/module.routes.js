import express from "express";
import { authMiddleware,verifyToken } from "../middlewares/auth.middleware.js";
import { getModulesByClass } from "../controllers/classes.controller.js";
import { createModule , uploadVideo, getModuleVideo, uploadVideoMiddleware} from "../controllers/module.controller.js";
const router = express.Router();

// Genera signed URL para reproducir video
router.get("/:id/video", verifyToken, getModuleVideo);

router.post("/:id/video", verifyToken, uploadVideoMiddleware, uploadVideo);

export default router;
