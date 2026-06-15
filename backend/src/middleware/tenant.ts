import type { NextFunction, Request, Response } from "express";
import { env } from "../config";
import { ForbiddenError, UnauthorizedError, ValidationError } from "../utils/api-error";

function getTenantHeader(request: Request): string | null {
  const value = request.headers[env.TENANT_HEADER];
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function hasClientSuppliedTenantId(req: Request): boolean {
  if (getTenantHeader(req)) {
    return true;
  }

  if (req.body && typeof req.body === "object" && "tenantId" in req.body) {
    return true;
  }

  if (req.query && "tenantId" in req.query) {
    return true;
  }

  if (req.params && "tenantId" in req.params) {
    return true;
  }

  return false;
}

/**
 * Binds the request to the authenticated user's tenant.
 *
 * - Tenant is derived only from `req.user.tenantId` (JWT session).
 * - Sets `req.tenantId` for downstream controllers/services/Prisma queries.
 * - Rejects client-supplied tenantId in body, query, params, or headers.
 *
 * Mount after `authMiddleware` / `requireAuth` on all tenant-scoped routes.
 */
export function requireTenant(req: Request, _res: Response, next: NextFunction): void {
  const user = req.user;

  if (!user?.tenantId) {
    next(new UnauthorizedError("Unauthorized: Missing tenant context"));
    return;
  }

  if (hasClientSuppliedTenantId(req)) {
    next(new ValidationError("Client-supplied tenantId is not allowed"));
    return;
  }

  if (req.tenantId && req.tenantId !== user.tenantId) {
    next(new ForbiddenError("Tenant mismatch"));
    return;
  }

  req.tenantId = user.tenantId;
  next();
}

export function rejectClientSuppliedTenantId(req: Request, _res: Response, next: NextFunction): void {
  if (hasClientSuppliedTenantId(req)) {
    next(new ValidationError("Client-supplied tenantId is not allowed"));
    return;
  }

  next();
}

/** Typed accessor for services — throws if tenant context is missing. */
export function getRequestTenantId(req: Request): string {
  if (!req.tenantId) {
    throw new ForbiddenError("Tenant context required");
  }

  return req.tenantId;
}
