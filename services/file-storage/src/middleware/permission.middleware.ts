import type { NextFunction, Request, Response } from "express";
import { PERMISSIONS, rbacService, type Permission } from "@ordella/security";
import { fileForbiddenError } from "@/utils/file-errors";
import { resolveRequestUser } from "@/middleware/request-user";

function sendForbidden(response: Response): void {
  response.status(403).json(fileForbiddenError().serialize());
}

export function hasFilesViewAccess(user: {
  role: string;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.FILES_VIEW)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role as never },
    PERMISSIONS.FILES_VIEW,
  );
}

export function hasFilesDeleteAccess(user: {
  role: string;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.FILES_DELETE)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role as never },
    PERMISSIONS.FILES_DELETE,
  );
}

export function hasFilesDeleteHardAccess(user: {
  role: string;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.FILES_DELETE_HARD)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role as never },
    PERMISSIONS.FILES_DELETE_HARD,
  );
}

export function hasFilesUploadAccess(user: {
  role: string;
  permissions?: string[];
}): boolean {
  if (user.role === "SYSTEM") {
    return true;
  }

  if (user.permissions?.includes(PERMISSIONS.FILES_UPLOAD)) {
    return true;
  }

  return rbacService.hasPermission(
    { userId: "", tenantId: "", role: user.role as never },
    PERMISSIONS.FILES_UPLOAD,
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
    if (permission === PERMISSIONS.FILES_VIEW) {
      allowed = hasFilesViewAccess(user);
    } else if (permission === PERMISSIONS.FILES_UPLOAD) {
      allowed = hasFilesUploadAccess(user);
    } else if (permission === PERMISSIONS.FILES_DELETE) {
      allowed = hasFilesDeleteAccess(user);
    } else if (permission === PERMISSIONS.FILES_DELETE_HARD) {
      allowed = hasFilesDeleteHardAccess(user);
    } else {
      allowed = rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        permission,
      );
    }

    if (!allowed) {
      sendForbidden(response);
      return;
    }

    next();
  };
}
