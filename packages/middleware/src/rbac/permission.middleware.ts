import type { NextFunction, Response } from "express";
import { roleHasMappedPermission, type RolePermissionKey } from "@ordella/security";
import type { SecurityRole } from "@ordella/security";
import type { OrdellaRequest } from "../common/types";
import { resolveRbacUser } from "./role.middleware";

function sendForbidden(response: Response, message: string): void {
  response.status(403).json({
    success: false,
    error: {
      code: "FORBIDDEN",
      message,
    },
    timestamp: new Date().toISOString(),
  });
}

function sendUnauthorized(response: Response): void {
  response.status(401).json({
    success: false,
    error: {
      code: "UNAUTHORIZED",
      message: "Authentication required.",
    },
    timestamp: new Date().toISOString(),
  });
}

export function requirePermission(permission: RolePermissionKey) {
  return (
    request: OrdellaRequest & { user?: { userId: string; tenantId?: string; role: SecurityRole } },
    response: Response,
    next: NextFunction,
  ): void => {
    const user = resolveRbacUser(request);

    if (!user) {
      sendUnauthorized(response);
      return;
    }

    if (!roleHasMappedPermission(user.role, permission)) {
      sendForbidden(response, "You do not have permission to perform this action.");
      return;
    }

    next();
  };
}
