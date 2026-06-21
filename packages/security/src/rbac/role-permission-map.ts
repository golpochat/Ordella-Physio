import type { SecurityRole } from "./roles";
import { buildPermissionRoleMap } from "./resolve-rbac";
import { PLATFORM_PERMISSIONS } from "./platform-permissions";

const platformMap = buildPermissionRoleMap();

export const PERMISSION_ROLE_MAP = {
  ...platformMap,
  "patients.read": platformMap[PLATFORM_PERMISSIONS.PATIENTS_READ] ?? ["TENANT_OWNER", "ADMIN", "STAFF", "THERAPIST", "READ_ONLY"],
  "patients.write": platformMap[PLATFORM_PERMISSIONS.PATIENTS_WRITE] ?? ["TENANT_OWNER", "ADMIN"],
  "billing.manage": platformMap[PLATFORM_PERMISSIONS.BILLING_MANAGE] ?? ["TENANT_OWNER", "ADMIN", "BILLING_ADMIN"],
  "platform.billing.metrics": platformMap[PLATFORM_PERMISSIONS.PLATFORM_BILLING_METRICS] ?? ["SUPER_ADMIN"],
  "tenant.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER"],
  "user.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "billing.analytics.view": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "BILLING_ADMIN"],
  "appointment.manage": ["SUPER_ADMIN", "ADMIN", "THERAPIST"],
  "patient.view": ["SUPER_ADMIN", "ADMIN", "THERAPIST", "STAFF", "PHARMACY", "READ_ONLY"],
  "patient.edit": ["SUPER_ADMIN", "ADMIN", "THERAPIST"],
  "patient.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "patient.notes": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "patient.attachments": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "notes.read": ["SUPER_ADMIN", "ADMIN", "THERAPIST", "STAFF", "PATIENT", "READ_ONLY"],
  "notes.write": ["SUPER_ADMIN", "ADMIN", "THERAPIST", "STAFF"],
  "messaging.read": ["SUPER_ADMIN", "ADMIN", "THERAPIST", "STAFF", "PATIENT", "PHARMACY"],
  "messaging.write": ["SUPER_ADMIN", "ADMIN", "THERAPIST", "STAFF", "PHARMACY"],
  "reporting.read": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF", "PHARMACY", "READ_ONLY"],
  "reporting.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "settings.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "organization.manage": ["SUPER_ADMIN", "ORG_ADMIN"],
  "location.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "terminal.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "role.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "audit.view": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "audit.export": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "audit.write_internal": ["SUPER_ADMIN"],
  "prescriptions.create": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "PHARMACY"],
  "prescriptions.update": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "PHARMACY"],
  "prescriptions.issue": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "PHARMACY"],
  "prescriptions.read": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF", "PHARMACY", "READ_ONLY"],
  "fulfillment.start": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "STAFF", "PHARMACY"],
  "fulfillment.complete": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "STAFF", "PHARMACY"],
  "fulfillment.fail": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "STAFF", "PHARMACY"],
  "notification.providers.view": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "notification.providers.manage": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "notification.logs.view": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "notification.analytics.view": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "notification.send": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
  "files.view": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "files.upload": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "files.delete": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN", "THERAPIST", "STAFF"],
  "files.delete.hard": ["SUPER_ADMIN", "TENANT_OWNER", "OWNER", "ADMIN"],
} as const satisfies Record<string, SecurityRole[]>;

export type RolePermissionKey = keyof typeof PERMISSION_ROLE_MAP;

export function getAllowedRolesForPermission(permission: RolePermissionKey): SecurityRole[] {
  return [...PERMISSION_ROLE_MAP[permission]];
}

export function roleHasMappedPermission(role: SecurityRole, permission: RolePermissionKey): boolean {
  if (role === "SYSTEM" || role === "SUPER_ADMIN") {
    return true;
  }

  const allowedRoles = PERMISSION_ROLE_MAP[permission] as readonly SecurityRole[] | undefined;
  if (!allowedRoles) {
    return false;
  }

  return (allowedRoles as SecurityRole[]).includes(role);
}
