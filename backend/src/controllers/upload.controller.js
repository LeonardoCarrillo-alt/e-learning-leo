import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../prisma.js";
import fs from "fs";
import path from "path";

// Configurar cliente S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Subir video y guardar en Module
export const uploadVideo = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const file = req.file; // multer
    if (!file) return res.status(400).json({ msg: "No se subió ningún archivo" });

    // Buscar módulo
    const module = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!module) return res.status(404).json({ msg: "Módulo no encontrado" });

    // Opcional: verificar que el usuario sea owner de la clase
    // if (req.user.role === "teacher" && req.user.id !== module.class.teacherId) return res.status(403).json({ msg: "No eres dueño de la clase" });

    // Subir a S3
    const fileStream = fs.createReadStream(file.path);
    const key = `modules/${moduleId}/${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: fileStream,
        ContentType: file.mimetype,
      })
    );

    // Guardar la key en DB
    await prisma.module.update({
      where: { id: moduleId },
      data: { videoUrl: key },
    });

    // Borrar archivo temporal
    fs.unlinkSync(file.path);

    res.json({ msg: "Video subido correctamente", key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
