import type { NextFunction, Request, Response } from "express";
import { env } from "../config";
import { ForbiddenError, UnauthorizedError } from "../utils/api-error";
import { verifyAccessToken } from "../utils/jwt";
import { resolveTenantByIdOrSlug } from "../utils/tenant-resolver";

const PUBLIC_PATHS = ["/", "/health", "/api/auth/login", "/api/auth/refresh"];

function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.some((route) => path === route || path.startsWith(`${route}/`));
}

function getBearerToken(request: Request): string | null {
  const header = request.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7).trim() || null;
}

function getTenantHeader(request: Request): string | null {
  const value = request.headers[env.TENANT_HEADER];
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function tenantMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const path = req.originalUrl.split("?")[0] ?? req.path;
  if (isPublicPath(path)) {
    next();
    return;
  }

  const headerTenantId = getTenantHeader(req);
  if (headerTenantId) {
    req.tenantId = headerTenantId;
  }

  next();
}

export async function resolveTenantHeaderMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.tenantId) {
    next();
    return;
  }

  try {
    const tenant = await resolveTenantByIdOrSlug(req.tenantId);
    if (tenant) {
      req.tenantId = tenant.id;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const path = req.originalUrl.split("?")[0] ?? req.path;
  if (isPublicPath(path)) {
    next();
    return;
  }

  const token = getBearerToken(req);
  if (!token) {
    next(new UnauthorizedError("Missing bearer token"));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      ...payload,
    };

    if (!req.tenantId) {
      req.tenantId = payload.tenantId;
    }

    if (req.tenantId && req.tenantId !== payload.tenantId) {
      next(new ForbiddenError("Tenant mismatch"));
      return;
    }

    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}

export function requireTenant(req: Request, _res: Response, next: NextFunction): void {
  if (!req.tenantId) {
    next(new ForbiddenError("Tenant context required"));
    return;
  }
  next();
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    next(new UnauthorizedError());
    return;
  }
  next();
}
