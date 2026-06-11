import type { NextFunction, Response } from "express";
import {
  isSystemRole,
  roleMeetsMinLevel,
  type SecurityRole,
} from "@ordella/security";
import type { OrdellaRequest } from "../common/types";
import { TENANT_HEADER } from "../common/constants";
import { getHeaderValue } from "../utils";

export type RbacRequestUser = {
  userId: string;
  tenantId?: string;
  role: SecurityRole;
};

export type RbacErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
  timestamp: string;
};

function sendRbacError(
  response: Response,
  statusCode: number,
  code: string,
  message: string,
): void {
  const payload: RbacErrorResponse = {
    success: false,
    error: { code, message },
    timestamp: new Date().toISOString(),
  };
  response.status(statusCode).json(payload);
}

export function resolveRbacUser(request: OrdellaRequest & { user?: RbacRequestUser }): RbacRequestUser | null {
  if (request.user?.userId && request.user.role) {
    return request.user;
  }

  const authContext = request.authContext;
  if (authContext?.userId && authContext.role) {
    return {
      userId: authContext.userId,
      tenantId: authContext.tenantId ?? request.tenantId ?? getHeaderValue(request, TENANT_HEADER),
      role: authContext.role as SecurityRole,
    };
  }

  return null;
}

export function requireRole(minRoleLevel: number) {
  return (request: OrdellaRequest & { user?: RbacRequestUser }, response: Response, next: NextFunction): void => {
    const user = resolveRbacUser(request);

    if (!user) {
      sendRbacError(response, 401, "UNAUTHORIZED", "Authentication required.");
      return;
    }

    if (!isSystemRole(user.role) && !roleMeetsMinLevel(user.role, minRoleLevel)) {
      sendRbacError(response, 403, "FORBIDDEN", "You do not have permission to access this resource.");
      return;
    }

    next();
  };
}

export function requireTenantMatch(getResourceTenantId: (request: OrdellaRequest) => string | undefined) {
  return (request: OrdellaRequest & { user?: RbacRequestUser }, response: Response, next: NextFunction): void => {
    const user = resolveRbacUser(request);

    if (!user) {
      sendRbacError(response, 401, "UNAUTHORIZED", "Authentication required.");
      return;
    }

    if (isSystemRole(user.role)) {
      next();
      return;
    }

    const resourceTenantId = getResourceTenantId(request);
    if (resourceTenantId && user.tenantId !== resourceTenantId) {
      sendRbacError(
        response,
        403,
        "TENANT_MISMATCH",
        "You cannot access resources from another tenant.",
      );
      return;
    }

    next();
  };
}
