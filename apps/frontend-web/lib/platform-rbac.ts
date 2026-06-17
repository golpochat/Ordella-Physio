import {
  hasResolvedPermission,
  isOrganizationRole,
  isSuperAdminRole,
  isTenantRole,
  normalizeEffectiveRole,
  PLATFORM_PERMISSIONS,
  type PlatformPermission,
} from "@ordella/security/rbac";

export { PLATFORM_PERMISSIONS, type PlatformPermission };

export type PermissionSubject = {
  role?: string;
  effectiveRole?: string;
  permissions?: string[];
  organizationId?: string | null;
};

export function getEffectiveRole(subject: PermissionSubject | null | undefined): string | null {
  if (!subject) {
    return null;
  }
  return normalizeEffectiveRole(subject.effectiveRole ?? subject.role);
}

export function userHasPlatformPermission(
  subject: PermissionSubject | null | undefined,
  permission: PlatformPermission | string,
): boolean {
  if (!subject) {
    return false;
  }

  const effectiveRole = getEffectiveRole(subject);
  return hasResolvedPermission(subject.permissions ?? [], permission, effectiveRole as never);
}

export function canAccessTenantPortal(subject: PermissionSubject | null | undefined): boolean {
  const role = getEffectiveRole(subject);
  return isTenantRole(role as never) && !isSuperAdminRole(role as never);
}

export function canAccessOrganizationPortal(subject: PermissionSubject | null | undefined): boolean {
  const role = getEffectiveRole(subject);
  return isOrganizationRole(role as never);
}

export function canAccessSuperAdminPortal(subject: PermissionSubject | null | undefined): boolean {
  const role = getEffectiveRole(subject);
  return isSuperAdminRole(role as never);
}

export const NAV_PERMISSION_REQUIREMENTS: Record<string, PlatformPermission | string> = {
  "/clinic/patients": PLATFORM_PERMISSIONS.PATIENTS_READ,
  "/clinic/appointments": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "/clinic/billing": PLATFORM_PERMISSIONS.BILLING_READ,
  "/clinic/notes": PLATFORM_PERMISSIONS.NOTES_READ,
  "/clinic/reports": PLATFORM_PERMISSIONS.REPORTS_READ,
  "/staff/patients": PLATFORM_PERMISSIONS.PATIENTS_READ,
  "/staff/appointments": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "/staff/billing": PLATFORM_PERMISSIONS.BILLING_READ,
  "/staff/notes": PLATFORM_PERMISSIONS.NOTES_READ,
  "/staff/reports": PLATFORM_PERMISSIONS.REPORTS_READ,
  "/therapist/today": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "/therapist/upcoming": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "/therapist/appointments": PLATFORM_PERMISSIONS.APPOINTMENTS_READ,
  "/therapist/patients": PLATFORM_PERMISSIONS.PATIENTS_READ,
  "/therapist/billing": PLATFORM_PERMISSIONS.BILLING_READ,
  "/therapist/notes": PLATFORM_PERMISSIONS.NOTES_WRITE,
  "/organization": PLATFORM_PERMISSIONS.ORG_TENANTS_READ,
  "/organization/billing": PLATFORM_PERMISSIONS.ORG_BILLING_MANAGE,
  "/super-admin": PLATFORM_PERMISSIONS.PLATFORM_USERS_MANAGE,
  "/super-admin/billing": PLATFORM_PERMISSIONS.PLATFORM_BILLING_METRICS,
};

export function canAccessNavHrefByPermission(
  pathname: string,
  subject: PermissionSubject | null | undefined,
): boolean {
  const match = Object.entries(NAV_PERMISSION_REQUIREMENTS)
    .filter(([href]) => pathname === href || pathname.startsWith(`${href}/`))
    .sort(([a], [b]) => b.length - a.length)[0];

  if (!match) {
    return true;
  }

  return userHasPlatformPermission(subject, match[1]);
}
