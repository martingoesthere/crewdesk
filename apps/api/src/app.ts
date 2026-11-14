import express from "express";
import { prisma } from "./lib/db.js";

export const app = express();
app.disable("x-powered-by");

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "ok" });
  } catch (error) {
    console.error("Health check failed: database unreachable", error);
    res.status(503).json({ status: "error", database: "unreachable" });
  }
});
