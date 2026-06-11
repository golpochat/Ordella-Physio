import type { SecurityRole } from "./roles";

export const PERMISSION_ROLE_MAP = {
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

export type RolePermissionKey = keyof typeof PERMISSION_ROLE_MAP;

export function getAllowedRolesForPermission(permission: RolePermissionKey): SecurityRole[] {
  return [...PERMISSION_ROLE_MAP[permission]];
}

export function roleHasMappedPermission(role: SecurityRole, permission: RolePermissionKey): boolean {
  if (role === "SYSTEM") {
    return true;
  }

  const allowedRoles = PERMISSION_ROLE_MAP[permission] as readonly SecurityRole[];
  return (allowedRoles as SecurityRole[]).includes(role);
}
