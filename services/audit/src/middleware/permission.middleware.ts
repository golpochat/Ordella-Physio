import type { NextFunction, Request, Response } from "express";
import { PERMISSIONS, rbacService } from "@ordella/security";
import type { Permission, SecurityRole } from "@ordella/security";
import {
  auditExportForbiddenError,
  auditForbiddenError,
  auditWriteForbiddenError,
} from "@/utils/audit-errors";
import { resolveRequestUser } from "@/middleware/request-user";

function sendForbidden(response: Response, error = auditForbiddenError()): void {
  response.status(403).json(error.serialize());
}

export function hasAuditViewAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.AUDIT_VIEW)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role },
    PERMISSIONS.AUDIT_VIEW,
  );
}

export function hasAuditExportAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.AUDIT_EXPORT)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role },
    PERMISSIONS.AUDIT_EXPORT,
  );
}

export function hasAuditWriteInternalAccess(user: {
  role: SecurityRole;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.AUDIT_WRITE_INTERNAL)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role },
    PERMISSIONS.AUDIT_WRITE_INTERNAL,
  );
}

export function requirePermission(permission: Permission) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);

    if (!user) {
      sendForbidden(response);
      return;
    }

    let allowed = false;
    if (permission === PERMISSIONS.AUDIT_VIEW) {
      allowed = hasAuditViewAccess(user);
    } else if (permission === PERMISSIONS.AUDIT_EXPORT) {
      allowed = hasAuditExportAccess(user);
    } else if (permission === PERMISSIONS.AUDIT_WRITE_INTERNAL) {
      allowed = hasAuditWriteInternalAccess(user);
    }

    if (!allowed) {
      sendForbidden(
        response,
        permission === PERMISSIONS.AUDIT_WRITE_INTERNAL
          ? auditWriteForbiddenError()
          : permission === PERMISSIONS.AUDIT_EXPORT
            ? auditExportForbiddenError()
            : auditForbiddenError(),
      );
      return;
    }

    next();
  };
}
