import type { NextFunction, Request, Response } from "express";

import { env } from "../config";

import { logSecurityEvent } from "../modules/security/security-events.service";

import { getUserTokenVersion } from "../modules/security/token-revocation.service";

import { ForbiddenError, UnauthorizedError } from "../utils/api-error";

import { verifyAccessToken } from "../utils/jwt";

import { resolveTenantByIdOrSlug } from "../utils/tenant-resolver";



const PUBLIC_PATHS = [
  "/",
  "/health",
  "/api/health",
  "/api/auth/login",
  "/api/auth/refresh",
  "/api/auth/csrf",
  "/api/auth/forgot-password",
  "/api/onboarding/start-trial",
  "/api/onboarding/register",
  "/api/onboarding/config",
  "/api/onboarding/checkout/preview",
];



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



/** Legacy global hook — tenant context is bound from JWT in `authMiddleware`. */

export function tenantMiddleware(_req: Request, _res: Response, next: NextFunction): void {

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



export async function authMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {

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

    const payload = await verifyAccessToken(token);

    const tokenVersion = await getUserTokenVersion(payload.sub);



    if (payload.tv !== undefined && payload.tv !== tokenVersion) {

      logSecurityEvent({

        type: "invalid_token",

        message: "Access token version mismatch",

        req,

        userId: payload.sub,

        tenantId: payload.tenantId,

      });

      next(new UnauthorizedError("Invalid or expired token"));

      return;

    }



    req.user = {

      id: payload.sub,

      ...payload,

    };



    req.tenantId = payload.tenantId;



    const headerTenantId = getTenantHeader(req);

    if (headerTenantId && headerTenantId !== payload.tenantId) {

      next(new ForbiddenError("Tenant mismatch"));

      return;

    }



    next();

  } catch {

    logSecurityEvent({

      type: "invalid_token",

      message: "Invalid access token",

      req,

    });

    next(new UnauthorizedError("Invalid or expired token"));

  }

}



export function requireAuth(req: Request, _res: Response, next: NextFunction): void {

  if (!req.user) {

    next(new UnauthorizedError());

    return;

  }

  next();

}



export { rejectClientSuppliedTenantId, requireTenant } from "./tenant";

