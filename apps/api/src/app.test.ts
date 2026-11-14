import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "./app.js";
import { prisma } from "./lib/db.js";

describe("GET /health", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 when the database answers", async () => {
    vi.spyOn(prisma, "$queryRaw").mockResolvedValueOnce([{ ok: 1 }]);

    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", database: "ok" });
  });

  it("returns 503 when the database is unreachable", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(prisma, "$queryRaw").mockRejectedValueOnce(
      new Error("connection refused"),
    );

    const res = await request(app).get("/health");

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "error", database: "unreachable" });
  });

  it("recovers without a restart when the database comes back", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(prisma, "$queryRaw")
      .mockRejectedValueOnce(new Error("connection refused"))
      .mockResolvedValueOnce([{ ok: 1 }]);

    const whileDown = await request(app).get("/health");
    const afterRecovery = await request(app).get("/health");

    expect(whileDown.status).toBe(503);
    expect(afterRecovery.status).toBe(200);
  });

  it("does not reveal the X-Powered-By header", async () => {
    vi.spyOn(prisma, "$queryRaw").mockResolvedValueOnce([{ ok: 1 }]);

    const res = await request(app).get("/health");

    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});
