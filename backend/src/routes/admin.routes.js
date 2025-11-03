import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { prisma } from "../prisma.js";

const router = express.Router();

// 1) lista clases con summary
router.get("/classes-dashboard", verifyToken, isAdmin, async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true,
          }
        },
        teacher: {
          select: { id: true, name: true }
        }
      }
    });

    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" });
  }
});

// 2) lista estudiantes
router.get("/students", verifyToken, isAdmin, async(req, res) =>{
  const students = await prisma.user.findMany({
    where: { role: "student" },
    select: { id: true, name: true, email: true }
  });
  res.json(students);
});

// 3) lista teachers
router.get("/teachers", verifyToken, isAdmin, async(req, res) =>{
  const teachers = await prisma.user.findMany({
    where: { role: "teacher" },
    select: { id: true, name: true, email: true }
  });
  res.json(teachers);
});

// 4) estudiantes de una clase
router.get("/class/:classId/students", verifyToken, isAdmin, async(req,res)=>{
  const { classId } = req.params;

  const enrolls = await prisma.enrollment.findMany({
    where:{ classId },
    include:{ student:{ select:{ id:true, name:true, email:true }}}
  });

  res.json(enrolls.map(e=>e.student));
});

export default router;
