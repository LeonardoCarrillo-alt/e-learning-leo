import { prisma } from "../prisma.js";

export const getTeacherClasses = async (req, res) => {
  const teacherId = req.user.id;

  try {
    const classes = await prisma.class.findMany({
      where: { teacherId },
      include: {
        modules: true, // incluir módulos
      },
    });
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las clases del docente' });
  }
};

