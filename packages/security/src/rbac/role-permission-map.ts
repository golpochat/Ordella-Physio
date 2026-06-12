import type { SecurityRole } from "./roles";

export const PERMISSION_ROLE_MAP = {
  "tenant.manage": ["SYSTEM", "OWNER"],
  "user.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "billing.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "billing.analytics.view": ["SYSTEM", "OWNER", "ADMIN"],
  "appointment.manage": ["SYSTEM", "ADMIN", "THERAPIST"],
  "inventory.manage": ["SYSTEM", "ADMIN", "PHARMACY"],
  "patient.view": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "patient.edit": ["SYSTEM", "ADMIN", "THERAPIST"],
  "patient.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "patient.notes": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "patient.attachments": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "notes.read": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PATIENT"],
  "notes.write": ["SYSTEM", "ADMIN", "THERAPIST"],
  "messaging.read": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PATIENT", "PHARMACY"],
  "messaging.write": ["SYSTEM", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "reporting.read": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "reporting.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "settings.manage": ["SYSTEM"],
  "organization.manage": ["SYSTEM"],
  "location.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "terminal.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "role.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "audit.view": ["SYSTEM", "OWNER", "ADMIN"],
  "audit.export": ["SYSTEM", "OWNER", "ADMIN"],
  "audit.write_internal": ["SYSTEM"],
  "files.upload": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "files.view": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "files.delete": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "files.delete.hard": ["SYSTEM", "OWNER", "ADMIN"],
  "files.generateThumbnail": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "notification.providers.view": ["SYSTEM", "OWNER", "ADMIN"],
  "notification.providers.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "notification.send": ["SYSTEM", "OWNER", "ADMIN", "STAFF"],
  "notification.logs.view": ["SYSTEM", "OWNER", "ADMIN"],
  "notification.analytics.view": ["SYSTEM", "OWNER", "ADMIN"],
  "search.index": ["SYSTEM", "OWNER", "ADMIN"],
  "search.query": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "search.admin": ["SYSTEM", "OWNER", "ADMIN"],
  "subscription.read": ["SYSTEM", "OWNER", "ADMIN"],
  "subscription.manage": ["SYSTEM", "OWNER", "ADMIN"],
  "subscription.admin": ["SYSTEM", "OWNER", "ADMIN"],
  "ai.use": ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "ai.manage": ["SYSTEM", "OWNER", "ADMIN"],
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
