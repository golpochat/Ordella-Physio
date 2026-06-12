import type { NextFunction, Request, Response } from "express";
import { roleHasMappedPermission } from "@ordella/security";
import type { SecurityRole } from "@ordella/security";
import { staffForbiddenError } from "@/utils/staff-errors";
import { resolveRequestUser } from "@/middleware/request-user";

const USER_MANAGE_PERMISSION = "user.manage";

function sendForbidden(response: Response): void {
  response.status(403).json(staffForbiddenError().serialize());
}

export function hasStaffManageAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(USER_MANAGE_PERMISSION)) {
    return true;
  }

  return roleHasMappedPermission(user.role, USER_MANAGE_PERMISSION);
}

export function requirePermission(_permission: typeof USER_MANAGE_PERMISSION) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);

    if (!user) {
      sendForbidden(response);
      return;
    }

    if (!hasStaffManageAccess(user)) {
      sendForbidden(response);
      return;
    }

    next();
  };
}
