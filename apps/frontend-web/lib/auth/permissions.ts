import type { SecurityRole } from "@ordella/security";

export const PERMISSIONS = {
  "tenant.manage": ["SYSTEM", "OWNER"],
  "user.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "billing.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "appointment.manage": ["SYSTEM", "ADMIN", "THERAPIST"],
  "inventory.manage": ["SYSTEM", "ADMIN", "PHARMACY"],
  "patient.view": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "patient.edit": ["SYSTEM", "ADMIN", "THERAPIST"],
  "notes.read": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PATIENT"],
  "notes.write": ["SYSTEM", "ADMIN", "THERAPIST"],
  "messaging.read": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PATIENT", "PHARMACY"],
  "messaging.write": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "reporting.read": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "settings.manage": ["SYSTEM"],
  "organization.manage": ["SYSTEM"],
  "location.manage": ["SYSTEM", "OWNER", "ADMIN"],
} as const satisfies Record<string, SecurityRole[]>;

export type AuthPermission = keyof typeof PERMISSIONS;

export function roleHasPermission(role: string | undefined, permission: AuthPermission): boolean {
  if (!role) {
    return false;
  }

  if (role === "SYSTEM") {
    return true;
  }

  const allowedRoles = PERMISSIONS[permission] as readonly string[];
  return allowedRoles.includes(role);
}

export function userHasPermission(
  user: { role?: string; roles?: string[]; permissions?: string[] } | null | undefined,
  permission: AuthPermission,
): boolean {
  if (!user) {
    return false;
  }

  if (user.permissions?.includes(permission)) {
    return true;
  }

  const roles = user.roles?.length ? user.roles : user.role ? [user.role] : [];
  return roles.some((role) => roleHasPermission(role, permission));
}
