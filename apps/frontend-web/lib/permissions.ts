import { PERMISSIONS, userHasPermission, type AuthPermission } from "@/lib/auth/permissions";

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

export type PermissionUser = {
  permissions?: string[];
  role?: string;
  roles?: string[];
} | null | undefined;

const PERMISSION_ALIASES: Partial<Record<PermissionValue | string, AuthPermission>> = {
  [Permission.REPORTING_VIEW]: "reporting.read",
  [Permission.PATIENT_EDIT]: "patient.edit",
};

function isAuthPermission(value: string): value is AuthPermission {
  return value in PERMISSIONS;
}

function resolveAuthPermission(permission: string): AuthPermission | null {
  const alias = PERMISSION_ALIASES[permission];
  if (alias) {
    return alias;
  }

  return isAuthPermission(permission) ? permission : null;
}

export function can(user: PermissionUser, permission: PermissionValue | string): boolean {
  if (!user) {
    return false;
  }

  if (user.permissions?.includes(permission)) {
    return true;
  }

  const authPermission = resolveAuthPermission(permission);
  if (authPermission) {
    return userHasPermission(user, authPermission);
  }

  return false;
}

export function canAny(user: PermissionUser, permissions: Array<PermissionValue | string> = []): boolean {
  return permissions.some((permission) => can(user, permission));
}

export function canAll(user: PermissionUser, permissions: Array<PermissionValue | string> = []): boolean {
  if (!permissions.length) {
    return true;
  }

  return permissions.every((permission) => can(user, permission));
}

export type NavItemWithPermission = {
  label: string;
  href: string;
  permission?: PermissionValue;
  anyOf?: PermissionValue[];
  allOf?: PermissionValue[];
};

export function canSeeNavItem(user: PermissionUser, item: NavItemWithPermission): boolean {
  if (item.allOf?.length && !canAll(user, item.allOf)) {
    return false;
  }

  if (item.anyOf?.length) {
    return canAny(user, item.anyOf);
  }

  if (item.permission) {
    return can(user, item.permission);
  }

  return true;
}

export function filterNavItems<T extends NavItemWithPermission>(
  items: readonly T[],
  user: PermissionUser,
): T[] {
  return items.filter((item) => canSeeNavItem(user, item));
}
