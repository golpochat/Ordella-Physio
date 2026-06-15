import { randomBytes, timingSafeEqual } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

import { env } from "../config";
import { logSecurityEvent } from "../modules/security/security-events.service";
import { ForbiddenError } from "../utils/api-error";

export const CSRF_COOKIE_NAME = "csrf-token";
export const CSRF_HEADER_NAME = "x-csrf-token";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const CSRF_EXEMPT_PREFIXES = ["/api/auth/login", "/api/auth/refresh", "/api/auth/csrf", "/api/health"];

function hasBearerAuth(req: Request): boolean {
  return Boolean(req.headers.authorization?.startsWith("Bearer "));
}

function isExempt(path: string): boolean {
  return CSRF_EXEMPT_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export function issueCsrfToken(_req: Request, res: Response): string {
  const token = randomBytes(32).toString("hex");
  res.cookie(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    sameSite: "strict",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: env.RATE_LIMIT_WINDOW_MS,
  });
  return token;
}

export function csrfProtection(req: Request, res: Response, next: NextFunction): void {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const path = req.originalUrl.split("?")[0] ?? req.path;
  if (isExempt(path) || hasBearerAuth(req)) {
    next();
    return;
  }

  if (!env.CSRF_SECRET && env.NODE_ENV !== "production") {
    next();
    return;
  }

  const cookieToken = req.cookies?.[CSRF_COOKIE_NAME];
  const headerToken = req.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken || !safeEqual(String(cookieToken), String(headerToken))) {
    logSecurityEvent({
      type: "csrf_failure",
      message: "CSRF token validation failed",
      req,
      metadata: { path, method: req.method },
    });
    next(new ForbiddenError("CSRF validation failed"));
    return;
  }

  next();
}
