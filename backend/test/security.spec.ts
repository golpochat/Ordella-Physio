import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../src/app";
import { CSRF_HEADER_NAME, csrfProtection, issueCsrfToken } from "../src/middleware/csrf";
import { errorHandler } from "../src/middleware/error-handler.middleware";
import { createRateLimiter } from "../src/middleware/rate-limit";
import { validateAndScanUpload, validateUpload } from "../src/modules/security/file-upload";

function buildRateLimitApp() {
  const app = express();
  app.set("trust proxy", true);
  app.use(createRateLimiter({ max: 2, windowMs: 60_000, keyPrefix: "security-test" }));
  app.get("/ping", (_req, res) => {
    res.json({ ok: true });
  });
  app.use(errorHandler);
  return app;
}

function buildCsrfApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(csrfProtection);
  app.get("/csrf", (req, res) => {
    const token = issueCsrfToken(req, res);
    res.json({ token });
  });
  app.post("/mutate", (_req, res) => {
    res.json({ ok: true });
  });
  app.use(errorHandler);
  return app;
}

describe("security middleware", () => {
  it("returns 429 with Retry-After when the rate limit is exceeded", async () => {
    const app = buildRateLimitApp();
    const ip = "203.0.113.55";

    await request(app).get("/ping").set("X-Forwarded-For", ip).expect(200);
    await request(app).get("/ping").set("X-Forwarded-For", ip).expect(200);

    const blocked = await request(app).get("/ping").set("X-Forwarded-For", ip);

    expect(blocked.status).toBe(429);
    expect(blocked.headers["retry-after"]).toBeTruthy();
    expect(blocked.body.error.code).toBe("TOO_MANY_REQUESTS");
  });

  it("rejects state-changing requests without a valid CSRF token", async () => {
    const response = await request(buildCsrfApp()).post("/mutate").send({ ok: true });
    expect(response.status).toBe(403);
    expect(response.body.error.message).toContain("CSRF");
  });

  it("allows state-changing requests with matching CSRF cookie and header", async () => {
    const app = buildCsrfApp();
    const agent = request.agent(app);

    const csrf = await agent.get("/csrf");
    const token = csrf.body.token as string;

    const response = await agent
      .post("/mutate")
      .set(CSRF_HEADER_NAME, token)
      .send({ ok: true });

    expect(response.status).toBe(200);
  });
});

describe.sequential("security auth flows", () => {
  const app = createApp();
  let dbReady = false;

  beforeAll(async () => {
    try {
      const login = await request(app)
        .post("/api/auth/login")
        .send({
          email: "admin@demo-clinic.dev",
          password: "Admin123!",
        });

      dbReady = login.status === 200;
    } catch {
      dbReady = false;
    }
  });

  it("rate limits repeated failed login attempts by IP and email", async (ctx) => {
    if (!dbReady) return ctx.skip();

    const email = `security-brute-${Date.now()}@example.com`;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app)
        .post("/api/auth/login")
        .send({
          email,
          password: "definitely-wrong-password",
        });
    }

    const blocked = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "definitely-wrong-password",
      });

    expect(blocked.status).toBe(429);
    expect(blocked.headers["retry-after"]).toBeTruthy();
    expect(blocked.body.error.code).toBe("TOO_MANY_REQUESTS");
  });

  it("rejects a revoked access token after logout", async (ctx) => {
    if (!dbReady) return ctx.skip();

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@demo-clinic.dev",
        password: "Admin123!",
      });

    expect(login.status).toBe(200);

    const accessToken = login.body.data.accessToken as string;
    const refreshToken = login.body.data.refreshToken as string;
    const decoded = jwt.decode(accessToken) as { jti?: string; exp?: number } | null;

    expect(decoded?.jti).toBeTruthy();

    await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        refreshToken,
        accessTokenJti: decoded?.jti,
        accessTokenExp: decoded?.exp,
      })
      .expect(204);

    const profile = await request(app)
      .get("/api/auth/users/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(profile.status).toBe(401);
  });
});

describe("upload validation", () => {
  it("rejects disallowed file types", () => {
    const result = validateUpload({
      fileName: "payload.exe",
      mimeType: "application/octet-stream",
      sizeBytes: 128,
    });

    expect(result.ok).toBe(false);
  });

  it("skips virus scanning when ClamAV is not configured", async () => {
    const result = await validateAndScanUpload({
      fileName: "note.txt",
      mimeType: "text/plain",
      sizeBytes: 5,
      buffer: Buffer.from("hello"),
    });

    expect(result.ok).toBe(true);
  });
});
