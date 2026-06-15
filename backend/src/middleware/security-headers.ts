import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";

import { env, getCorsOrigins } from "../config";

export function createSecurityHeaders() {
  const frontendOrigin = env.FRONTEND_URL;

  return helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", frontendOrigin, ...getCorsOrigins()],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-site" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts:
      env.NODE_ENV === "production"
        ? { maxAge: 63_072_000, includeSubDomains: true, preload: true }
        : false,
  });
}

export function permissionsPolicy(_req: Request, res: Response, next: NextFunction): void {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );
  next();
}
