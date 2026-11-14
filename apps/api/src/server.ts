import "dotenv/config";
import express from "express";
import { prisma } from "./lib/db.js";

const app = express();
app.disable("x-powered-by");

const PORT = Number(process.env.PORT) || 4000;

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "ok" });
  } catch (error) {
    console.error("Health check failed: database unreachable", error);
    res.status(503).json({ status: "error", database: "unreachable" });
  }
});

app.listen(PORT, () => {
  console.log(`CrewDesk API listening on http://localhost:${PORT}`);
});
