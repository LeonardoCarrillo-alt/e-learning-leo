import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ msg: "El email ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashed, role }
    });

    res.json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      token,
      role: user.role,
      name: user.name,
      userId: user.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
