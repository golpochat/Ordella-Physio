import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ForbiddenError } from "../utils/api-error";

export type AuthorizeOptions = {
  /** User must have at least one of these permissions (default when `permissions` set). */
  permissions?: readonly string[];
  /** User must have all of these permissions. */
  allPermissions?: readonly string[];
  /** User must have at least one of these roles. */
  roles?: readonly string[];
  /** Block request if user has any of these roles. */
  denyRoles?: readonly string[];
};

function getUserPermissions(req: Request): Set<string> {
  return new Set(req.user?.permissions ?? []);
}

function getUserRoles(req: Request): Set<string> {
  return new Set(req.user?.roles ?? []);
}

function assertAuthenticated(req: Request): void {
  if (!req.user) {
    throw new ForbiddenError("Authentication required");
  }
}

/**
 * Unified RBAC guard — checks denied roles, allowed roles, then permissions.
 */
export function authorize(options: AuthorizeOptions): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      assertAuthenticated(req);

      const userRoles = getUserRoles(req);
      const userPermissions = getUserPermissions(req);

      if (options.denyRoles?.length) {
        const blocked = options.denyRoles.some((role) => userRoles.has(role));
        if (blocked) {
          throw new ForbiddenError("Access denied for this role");
        }
      }

      if (options.roles?.length) {
        const allowed = options.roles.some((role) => userRoles.has(role));
        if (!allowed) {
          throw new ForbiddenError("Insufficient role");
        }
      }

      if (options.allPermissions?.length) {
        const missing = options.allPermissions.filter((permission) => !userPermissions.has(permission));
        if (missing.length > 0) {
          throw new ForbiddenError(`Missing permissions: ${missing.join(", ")}`);
        }
      }

      if (options.permissions?.length) {
        const granted = options.permissions.some((permission) => userPermissions.has(permission));
        if (!granted) {
          throw new ForbiddenError(`Missing permissions: ${options.permissions.join(", ")}`);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function requirePermissions(...required: string[]): RequestHandler {
  return authorize({ permissions: required });
}

export function requireAnyPermission(...required: string[]): RequestHandler {
  return authorize({ permissions: required });
}

export function requireAllPermissions(...required: string[]): RequestHandler {
  return authorize({ allPermissions: required });
}

export function requireRoles(...roles: string[]): RequestHandler {
  return authorize({ roles });
}

export function denyRoles(...denied: string[]): RequestHandler {
  return authorize({ denyRoles: denied });
}
