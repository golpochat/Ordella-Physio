import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../utils/api-error";
import { logSecurityEvent } from "../modules/security/security-events.service";

export const Permission = {
  PATIENT_VIEW: "patient.view",
  PATIENT_MANAGE: "patient.manage",
  PATIENT_EDIT: "patient.edit",
  PATIENT_ATTACHMENTS: "patient.attachments",

  APPOINTMENT_MANAGE: "appointment.manage",

  NOTES_READ: "notes.read",
  NOTES_WRITE: "notes.write",

  BILLING_MANAGE: "billing.manage",

  REPORTING_VIEW: "reporting.view",
  REPORTING_READ: "reporting.read",

  ROLE_MANAGE: "role.manage",
  USER_MANAGE: "user.manage",

  SETTINGS_MANAGE: "settings.manage",
  TENANT_MANAGE: "tenant.manage",
  ORGANIZATION_MANAGE: "organization.manage",
  TERMINAL_MANAGE: "terminal.manage",
} as const;

export type PermissionValue = (typeof Permission)[keyof typeof Permission];

type PermissionSubject = {
  permissions?: string[];
} | null | undefined;

/**
 * Canonical portal permissions may be granted by either dot-notation (frontend)
 * or legacy colon-notation (seeded clinic roles in the database).
 */
export const PERMISSION_GRANTS: Record<PermissionValue, readonly string[]> = {
  [Permission.PATIENT_VIEW]: ["patient.view", "patients:read"],
  [Permission.PATIENT_MANAGE]: ["patient.manage", "patients:write"],
  [Permission.PATIENT_EDIT]: ["patient.edit", "patients:write"],
  [Permission.PATIENT_ATTACHMENTS]: ["patient.attachments", "patients:read", "patients:write"],
  [Permission.APPOINTMENT_MANAGE]: ["appointment.manage", "appointments:write", "appointments:read"],
  [Permission.NOTES_READ]: ["notes.read", "notes:read"],
  [Permission.NOTES_WRITE]: ["notes.write", "notes:write"],
  [Permission.BILLING_MANAGE]: ["billing.manage", "billing:write", "billing:read"],
  [Permission.REPORTING_VIEW]: ["reporting.view", "reporting.read", "reports:read"],
  [Permission.REPORTING_READ]: ["reporting.read", "reports:read"],
  [Permission.ROLE_MANAGE]: ["role.manage", "rbac:write"],
  [Permission.USER_MANAGE]: ["user.manage", "rbac:read", "rbac:write"],
  [Permission.SETTINGS_MANAGE]: ["settings.manage", "rbac:write"],
  [Permission.TENANT_MANAGE]: ["tenant.manage", "rbac:write"],
  [Permission.ORGANIZATION_MANAGE]: ["organization.manage", "rbac:write"],
  [Permission.TERMINAL_MANAGE]: ["terminal.manage", "staff:write", "staff:read"],
};

function resolvePermissionGrants(permission: string): readonly string[] {
  if (permission in PERMISSION_GRANTS) {
    return PERMISSION_GRANTS[permission as PermissionValue];
  }

  return [permission];
}

export function userHasPermission(user: PermissionSubject, permission: string): boolean {
  if (!user?.permissions?.length) {
    return false;
  }

  const granted = new Set(user.permissions);
  return resolvePermissionGrants(permission).some((entry) => granted.has(entry));
}

/** Adds canonical dot-notation permissions alongside legacy colon grants for JWT/API clients. */
export function expandCanonicalPermissions(permissions: string[]): string[] {
  const expanded = new Set(permissions);

  for (const [canonical, grants] of Object.entries(PERMISSION_GRANTS) as [PermissionValue, readonly string[]][]) {
    if (grants.some((grant) => expanded.has(grant))) {
      expanded.add(canonical);
      for (const grant of grants) {
        expanded.add(grant);
      }
    }
  }

  return [...expanded];
}

export function requirePermission(permission: PermissionValue | string): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }

    if (!userHasPermission(req.user, permission)) {
      logSecurityEvent({
        type: "permission_denied",
        message: `Missing permission ${permission}`,
        req,
        metadata: { permission },
      });
      next(new ForbiddenError(`Forbidden: Missing permission ${permission}`));
      return;
    }

    next();
  };
}

export function requireAny(permissions: string[] = []): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }

    const allowed = permissions.some((permission) => userHasPermission(req.user, permission));
    if (!allowed) {
      logSecurityEvent({
        type: "permission_denied",
        message: "Missing required permissions (any)",
        req,
        metadata: { permissions },
      });
      next(new ForbiddenError("Forbidden: Missing required permissions"));
      return;
    }

    next();
  };
}

export function requireAll(permissions: string[] = []): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }

    const allowed = permissions.every((permission) => userHasPermission(req.user, permission));
    if (!allowed) {
      logSecurityEvent({
        type: "permission_denied",
        message: "Missing required permissions (all)",
        req,
        metadata: { permissions },
      });
      next(new ForbiddenError("Forbidden: Missing required permissions"));
      return;
    }

    next();
  };
}

/** Compose multiple middleware handlers into a single route guard. */
export function composePolicy(...handlers: RequestHandler[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    let index = 0;

    const dispatch = (error?: unknown): void => {
      if (error) {
        next(error);
        return;
      }

      if (index >= handlers.length) {
        next();
        return;
      }

      const handler = handlers[index++]!;
      handler(req, res, dispatch);
    };

    dispatch();
  };
}
