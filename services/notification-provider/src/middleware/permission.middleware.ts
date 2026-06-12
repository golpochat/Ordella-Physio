import type { NextFunction, Request, Response } from "express";
import { PERMISSIONS, rbacService, type Permission } from "@ordella/security";
import { providerForbiddenError } from "@/utils/provider-errors";
import { resolveRequestUser } from "@/middleware/request-user";

function sendForbidden(response: Response): void {
  response.status(403).json(providerForbiddenError().serialize());
}

export function requirePermission(permission: Permission) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);

    if (!user) {
      sendForbidden(response);
      return;
    }

    const allowed =
      user.role === "SYSTEM" ||
      user.permissions?.includes(permission) ||
      rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        permission,
      );

    if (!allowed) {
      sendForbidden(response);
      return;
    }

    next();
  };
}

export function hasNotificationSendAccess(user: {
  role: string;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.NOTIFICATION_SEND)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role as never },
    PERMISSIONS.NOTIFICATION_SEND,
  );
}
