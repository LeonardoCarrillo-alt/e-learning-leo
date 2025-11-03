import jwt from "jsonwebtoken";

import { prisma } from "../prisma.js";
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "No hay token" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token inválido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id, role }

    // opcional: traer usuario de DB
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token inválido" });
  }
};


export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "No tienes permisos" });
    }
    next();
  };
};
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "No autorizado" });
  next();
};

export const isTeacher = (req, res, next) => {
  if (req.user.role === "teacher" || req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "No tienes permisos" });
  }
};

export const isStudent = (req, res, next) => {
  if (req.user.role !== "student") return res.status(403).json({ msg: "No autorizado" });
  next();
};