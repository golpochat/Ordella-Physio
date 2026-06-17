import type { PortalRole } from "@/lib/rbac";
import {
  canAccessNavHrefByPermission,
  userHasPlatformPermission,
  type PermissionSubject,
} from "@/lib/platform-rbac";
import { PLATFORM_PERMISSIONS } from "@ordella/security/rbac";

export type PortalCapability =
  | "patients.read"
  | "patients.write"
  | "patients:read"
  | "patients:write"
  | "appointments.read"
  | "appointments.write"
  | "appointments:read"
  | "appointments:write"
  | "billing.read"
  | "billing.manage"
  | "billing:read"
  | "billing:write"
  | "notes.read"
  | "notes.write"
  | "notes:read"
  | "notes:write"
  | "reports.read"
  | "reports:read"
  | "schedule.read"
  | "schedule:read"
  | "profile.read"
  | "profile:read";

const CAPABILITY_PERMISSION_MAP: Record<PortalCapability, string> = {
  "patients.read": PLATFORM_PERMISSIONS.PATIENTS_READ,
  "patients.write": PLATFORM_PERMISSIONS.PATIENTS_WRITE,
  "patients:read": PLATFORM_PERMISSIONS.PATIENTS_READ,
  "patients:write": PLATFORM_PERMISSIONS.PATIENTS_WRITE,
  "appointments.read": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "appointments.write": PLATFORM_PERMISSIONS.APPOINTMENTS_WRITE,
  "appointments:read": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "appointments:write": PLATFORM_PERMISSIONS.APPOINTMENTS_WRITE,
  "billing.read": PLATFORM_PERMISSIONS.BILLING_READ,
  "billing.manage": PLATFORM_PERMISSIONS.BILLING_MANAGE,
  "billing:read": PLATFORM_PERMISSIONS.BILLING_READ,
  "billing:write": PLATFORM_PERMISSIONS.BILLING_MANAGE,
  "notes.read": PLATFORM_PERMISSIONS.NOTES_READ,
  "notes.write": PLATFORM_PERMISSIONS.NOTES_WRITE,
  "notes:read": PLATFORM_PERMISSIONS.NOTES_READ,
  "notes:write": PLATFORM_PERMISSIONS.NOTES_WRITE,
  "reports.read": PLATFORM_PERMISSIONS.REPORTS_READ,
  "reports:read": PLATFORM_PERMISSIONS.REPORTS_READ,
  "schedule.read": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "schedule:read": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "profile.read": PLATFORM_PERMISSIONS.SETTINGS_READ,
  "profile:read": PLATFORM_PERMISSIONS.SETTINGS_READ,
};

const LEGACY_CAPABILITY_ALIASES: Record<string, PortalCapability> = {
  "patients:read": "patients.read",
  "patients:write": "patients.write",
  "appointments:read": "appointments.read",
  "appointments:write": "appointments.write",
  "billing:read": "billing.read",
  "billing:write": "billing.manage",
  "notes:read": "notes.read",
  "notes:write": "notes.write",
  "reports:read": "reports.read",
};

function normalizeCapability(capability: string): PortalCapability {
  if (capability in CAPABILITY_PERMISSION_MAP) {
    return capability as PortalCapability;
  }
  return LEGACY_CAPABILITY_ALIASES[capability] ?? (capability as PortalCapability);
}

export function toPermissionSubject(
  roles: PortalRole[],
  permissions: string[] = [],
  effectiveRole?: string,
): PermissionSubject {
  return {
    role: roles[0],
    effectiveRole,
    permissions,
  };
}

export function portalHasCapability(
  rolesOrSubject: PortalRole[] | PermissionSubject,
  capability: PortalCapability | string,
  permissions: string[] = [],
  effectiveRole?: string,
): boolean {
  const normalized = normalizeCapability(capability);
  const subject = Array.isArray(rolesOrSubject)
    ? toPermissionSubject(rolesOrSubject, permissions, effectiveRole)
    : rolesOrSubject;
  return userHasPlatformPermission(subject, CAPABILITY_PERMISSION_MAP[normalized]);
}

export function getPortalCapabilities(
  rolesOrSubject: PortalRole[] | PermissionSubject,
  permissions: string[] = [],
  effectiveRole?: string,
): PortalCapability[] {
  const subject = Array.isArray(rolesOrSubject)
    ? toPermissionSubject(rolesOrSubject, permissions, effectiveRole)
    : rolesOrSubject;

  return (Object.entries(CAPABILITY_PERMISSION_MAP) as Array<[PortalCapability, string]>)
    .filter(([, permission]) => userHasPlatformPermission(subject, permission))
    .map(([capability]) => capability);
}

export const PORTAL_NAV_CAPABILITIES: Record<string, PortalCapability> = {
  "/clinic/patients": "patients.read",
  "/clinic/appointments": "appointments.read",
  "/clinic/billing": "billing.read",
  "/clinic/notes": "notes.read",
  "/clinic/reports": "reports.read",
  "/staff/patients": "patients.read",
  "/staff/appointments": "appointments.read",
  "/staff/billing": "billing.read",
  "/staff/notes": "notes.read",
  "/staff/reports": "reports.read",
  "/therapist/today": "appointments.read",
  "/therapist/upcoming": "schedule.read",
  "/therapist/appointments": "appointments.read",
  "/therapist/patients": "patients.read",
  "/therapist/billing": "billing.read",
  "/therapist/notes": "notes.write",
  "/patient/profile": "profile.read",
};

export function canAccessNavHref(
  pathname: string,
  rolesOrSubject: PortalRole[] | PermissionSubject,
  permissions: string[] = [],
  effectiveRole?: string,
): boolean {
  const subject = Array.isArray(rolesOrSubject)
    ? toPermissionSubject(rolesOrSubject, permissions, effectiveRole)
    : rolesOrSubject;
  return canAccessNavHrefByPermission(pathname, subject);
}
