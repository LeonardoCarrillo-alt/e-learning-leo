import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getModulesByClass } from "../controllers/classes.controller.js";
import { getVideoSignedUrl } from "../controllers/module.controller.js";
import { createModule } from "../controllers/classes.controller.js"; // si lo creaste

const router = express.Router();
router.post("/classes/:id/modules", verifyToken, createModule);


// Lista módulos de una clase
router.get("/classes/:id/modules", verifyToken, getModulesByClass);

// Genera signed URL para reproducir video
router.get("/modules/:id/video", verifyToken, getVideoSignedUrl);

export default router;
