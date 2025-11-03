// controllers/studentController.js
import { prisma } from "../prisma.js";

export const getStudentClasses = async (req, res) => {
  const studentId = req.user.id; // viene del JWT en authMiddleware

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        class: {
          include: {
            modules: true // si quieres que ya venga info de los módulos
          }
        }
      }
    });

    // extraer solo las clases
    const classes = enrollments.map((enrollment) => enrollment.class);

    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las clases del estudiante' });
  }
};
