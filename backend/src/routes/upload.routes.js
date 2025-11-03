import express from "express";
import { uploadVideo } from "../controllers/upload.controller.js";
import { upload } from "../middlewares/upload.js";
import { verifyToken, isTeacher } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/video",
  verifyToken,
  isTeacher,
  upload.single("video"),
  uploadVideo
);

export default router;
