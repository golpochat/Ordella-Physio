import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { env, getCorsOrigins } from "./config";
import { initSentry } from "./modules/security/sentry";
import { apiRouter } from "./routes";
import {
  authMiddleware,
  correlationIdMiddleware,
  createSecurityHeaders,
  csrfProtection,
  enforceHttps,
  errorHandler,
  globalRateLimiter,
  notFoundHandler,
  permissionsPolicy,
  resolveTenantHeaderMiddleware,
  sanitizeInput,
  tenantMiddleware,
} from "./middleware";

void initSentry(env.SENTRY_DSN ?? "", env.NODE_ENV);

export function createApp() {
  const app = express();

  if (env.TRUST_PROXY) {
    app.set("trust proxy", 1);
  }

  app.use(enforceHttps);
  app.use(correlationIdMiddleware);
  app.use(createSecurityHeaders());
  app.use(permissionsPolicy);
  app.use(
    cors({
      origin(origin, callback) {
        const allowed = getCorsOrigins();
        if (!origin || allowed.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        env.TENANT_HEADER,
        "x-correlation-id",
        "x-csrf-token",
      ],
    }),
  );
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(sanitizeInput);
  app.use(globalRateLimiter);
  app.use(csrfProtection);

  app.use(tenantMiddleware);
  app.use(resolveTenantHeaderMiddleware);
  app.use(authMiddleware);

  app.use("/api", apiRouter);
  app.get("/", (_req, res) => {
    res.json({
      service: "clinic-backend",
      status: "ok",
      message: "Ordella clinic API — use the frontend app for the UI.",
      frontend: env.FRONTEND_URL,
      health: "/health",
      login: "POST /api/auth/login",
    });
  });
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
