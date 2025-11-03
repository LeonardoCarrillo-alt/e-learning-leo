import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadVideo } from "../controllers/video.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/upload", authMiddleware, upload.single("video"), uploadVideo);

export default router;
