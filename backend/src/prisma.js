// src/prisma.js
import dotenv from "dotenv";
dotenv.config();  // carga variables de entorno antes de Prisma

// import { PrismaClient } from "./generated/client.ts";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
