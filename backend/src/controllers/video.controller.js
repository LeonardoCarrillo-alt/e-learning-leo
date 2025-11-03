import { prisma } from "../prisma.js";
import { uploadVideoToS3 } from "../config/s3.js";
import { v4 as uuid } from "uuid";

export const uploadVideo = async (req, res) => {
  try {
    const { classId, moduleId } = req.body;
    const file = req.file;

    // validar ownership
    const classData = await prisma.class.findUnique({ where: { id: classId } });
    if (!classData) return res.status(404).json({ msg: "Clase no existe" });
    if (classData.teacherId !== req.user.id) return res.status(403).json({ msg: "No autorizado" });

    const videoId = uuid();

    const videoUrl = await uploadVideoToS3(
      file.buffer,
      classId,
      moduleId,
      `${videoId}.mp4`,
      file.mimetype
    );

    const newVideo = await prisma.video.create({
      data: {
        title: file.originalname,
        url: videoUrl,
        moduleId
      }
    });

    res.json(newVideo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
