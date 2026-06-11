import type { NextFunction, Response } from "express";
import { HttpError } from "@ordella/errors";
import type { AuthPermission } from "@/config/permissions";
import { hasPermissionForRole } from "@/config/permissions";
import { forbiddenError, unauthorizedError } from "@/utils/auth-errors";
import { resolveRequestUser, type AuthenticatedRequest } from "@/middleware/request-user";

function sendError(response: Response, error: HttpError): void {
  response.status(error.statusCode).json(error.serialize());
}

export function requirePermission(permission: AuthPermission) {
  return (request: AuthenticatedRequest, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request);

    if (!user) {
      sendError(response, unauthorizedError());
      return;
    }

    if (!hasPermissionForRole(user.role, permission)) {
      sendError(response, forbiddenError("You do not have permission to perform this action."));
      return;
    }

    next();
  };
}
