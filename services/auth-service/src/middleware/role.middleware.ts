import type { NextFunction, Response } from "express";
import { HttpError } from "@ordella/errors";
import { isSystem, roleMeetsMinLevel } from "@/utils/roles";
import { forbiddenError, tenantMismatchError, unauthorizedError } from "@/utils/auth-errors";
import { resolveRequestUser, type AuthenticatedRequest } from "@/middleware/request-user";

function sendError(response: Response, error: HttpError): void {
  response.status(error.statusCode).json(error.serialize());
}

export function requireRole(minRoleLevel: number) {
  return (request: AuthenticatedRequest, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request);

    if (!user) {
      sendError(response, unauthorizedError());
      return;
    }

    if (!isSystem(user) && !roleMeetsMinLevel(user.role, minRoleLevel)) {
      sendError(response, forbiddenError());
      return;
    }

    next();
  };
}

export function requireTenantMatch(getResourceTenantId: (request: AuthenticatedRequest) => string | undefined) {
  return (request: AuthenticatedRequest, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request);

    if (!user) {
      sendError(response, unauthorizedError());
      return;
    }

    if (isSystem(user)) {
      next();
      return;
    }

    const resourceTenantId = getResourceTenantId(request);
    if (resourceTenantId && user.tenantId !== resourceTenantId) {
      sendError(response, tenantMismatchError());
      return;
    }

    next();
  };
}
