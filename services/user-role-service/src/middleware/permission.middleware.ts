import type { NextFunction, Request, Response } from "express";
import { roleHasMappedPermission } from "@ordella/security";
import type { SecurityRole } from "@ordella/security";
import { roleForbiddenError } from "@/utils/role-errors";
import { resolveRequestUser } from "@/middleware/request-user";

const ROLE_MANAGE_PERMISSION = "role.manage";

function sendForbidden(response: Response): void {
  response.status(403).json(roleForbiddenError().serialize());
}

export function hasRoleManageAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(ROLE_MANAGE_PERMISSION)) {
    return true;
  }

  return roleHasMappedPermission(user.role, ROLE_MANAGE_PERMISSION);
}

export function requirePermission(_permission: typeof ROLE_MANAGE_PERMISSION) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);

    if (!user) {
      sendForbidden(response);
      return;
    }

    if (!hasRoleManageAccess(user)) {
      sendForbidden(response);
      return;
    }

    next();
  };
}
