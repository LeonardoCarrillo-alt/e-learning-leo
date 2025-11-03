import { prisma } from "../prisma.js";

// Crear un enrollment (ahora lo hace el propio estudiante)
export const createEnrollment = async (req, res) => {
  const studentId = req.user.id; // viene del JWT
  const { classId } = req.body;

  try {
    // Verificar si ya existe
    const existing = await prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Ya estás inscrito en esta clase." });
    }

    const enrollment = await prisma.enrollment.create({
      data: { studentId, classId },
    });

    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la inscripción" });
  }
};
