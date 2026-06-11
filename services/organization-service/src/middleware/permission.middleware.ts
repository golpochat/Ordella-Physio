import type { NextFunction, Request, Response } from "express";
import { PERMISSIONS, rbacService } from "@ordella/security";
import type { SecurityRole } from "@ordella/security";
import { organizationForbiddenError } from "@/utils/organization-errors";
import { resolveRequestUser } from "@/middleware/request-user";

function sendForbidden(response: Response): void {
  response.status(403).json(organizationForbiddenError().serialize());
}

export function hasOrganizationManageAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.ORGANIZATION_MANAGE)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role },
    PERMISSIONS.ORGANIZATION_MANAGE,
  );
}

export function requirePermission(_permission: typeof PERMISSIONS.ORGANIZATION_MANAGE) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);

    if (!user) {
      sendForbidden(response);
      return;
    }

    if (!hasOrganizationManageAccess(user)) {
      sendForbidden(response);
      return;
    }

    next();
  };
}
