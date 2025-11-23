import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import classesRoutes from "./routes/classes.routes.js";
import moduleRoutes from "./routes/module.routes.js";
import videoRoutes from "./routes/video.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js"
import enrollmentRoutes from "./routes/enrollment.routes.js"
import adminRoutes from "./routes/admin.routes.js"
dotenv.config();

const app = express();

// Configurar CORS para permitir el frontend desde otra máquina EC2
// Reemplaza con la IP pública o dominio de tu máquina EC2 del frontend
const FRONTEND_URL = process.env.FRONTEND_URL || "*"; // Por defecto permite todos los orígenes

app.use(cors({
  origin: FRONTEND_URL === "*" ? true : FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de clases
app.use("/classes", classesRoutes);

// Rutas de módulos
app.use("/modules", moduleRoutes);

// Rutas de videos
app.use("/videos", videoRoutes);

// Rutas de upload
app.use("/upload", uploadRoutes);
app.use("/teacher", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "E-Study Backend OK!" });
});
// app.get("/test-db", async (req, res) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT NOW()`;
//     res.json({ now: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error conectando a DB" });
//   }
// });

// inicializar DB
connectDB();

const PORT = process.env.PORT || 5000;
// Escuchar en todas las interfaces (0.0.0.0) para permitir conexiones desde otras máquinas
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend E-Study iniciado en puerto ${PORT}`);
  console.log(`Escuchando en todas las interfaces (0.0.0.0:${PORT})`);
  console.log(`CORS configurado para: ${FRONTEND_URL}`);
});
