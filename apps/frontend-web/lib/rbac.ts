import type { SecurityRole } from "@ordella/security";
import { DASHBOARD_ROUTES } from "./constants";

export type PortalRole = SecurityRole | "PATIENT" | "PHARMACY" | "USER";

export const ROLE_DASHBOARD_MAP: Record<PortalRole, string> = {
  SYSTEM: DASHBOARD_ROUTES.superAdmin,
  OWNER: DASHBOARD_ROUTES.admin,
  ADMIN: DASHBOARD_ROUTES.clinic,
  THERAPIST: DASHBOARD_ROUTES.therapist,
  STAFF: DASHBOARD_ROUTES.staff,
  PATIENT: DASHBOARD_ROUTES.patient,
  PHARMACY: DASHBOARD_ROUTES.pharmacy,
  USER: DASHBOARD_ROUTES.user,
};

export const ROUTE_ROLE_ACCESS: Record<string, PortalRole[]> = {
  [DASHBOARD_ROUTES.superAdmin]: ["SYSTEM"],
  [DASHBOARD_ROUTES.admin]: ["OWNER"],
  [DASHBOARD_ROUTES.clinic]: ["ADMIN"],
  [DASHBOARD_ROUTES.therapist]: ["THERAPIST"],
  [DASHBOARD_ROUTES.patient]: ["PATIENT"],
  [DASHBOARD_ROUTES.pharmacy]: ["PHARMACY"],
  [DASHBOARD_ROUTES.staff]: ["STAFF"],
  [DASHBOARD_ROUTES.user]: ["USER"],
  "/appointments": ["ADMIN", "STAFF", "THERAPIST", "PATIENT"],
  "/patients": ["ADMIN", "STAFF", "THERAPIST"],
  "/billing": ["ADMIN", "STAFF", "PATIENT"],
  "/notes": ["ADMIN", "STAFF", "THERAPIST", "PATIENT"],
  "/settings": ["SYSTEM", "OWNER", "ADMIN", "STAFF", "THERAPIST", "PATIENT", "PHARMACY", "USER"],
};

export function hasRole(userRoles: PortalRole[], required: PortalRole | PortalRole[]): boolean {
  const requiredRoles = Array.isArray(required) ? required : [required];
  return requiredRoles.some((role) => userRoles.includes(role));
}

export function hasPermission(userPermissions: string[], permission: string | string[]): boolean {
  const required = Array.isArray(permission) ? permission : [permission];
  return required.every((entry) => userPermissions.includes(entry));
}

export function canAccessRoute(pathname: string, roles: PortalRole[]): boolean {
  const matched = Object.entries(ROUTE_ROLE_ACCESS).find(
    ([route]) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!matched) {
    return true;
  }

  const [, allowedRoles] = matched;
  return hasRole(roles, allowedRoles);
}

export function getDefaultDashboardForRoles(roles: PortalRole[] | undefined): string {
  const resolved = roles?.length ? roles : [];
  const primary = resolved.find((role) => ROLE_DASHBOARD_MAP[role]);
  return primary ? ROLE_DASHBOARD_MAP[primary] : DASHBOARD_ROUTES.user;
}

export function resolveUserRoles(user: {
  role?: PortalRole;
  roles?: PortalRole[];
}): PortalRole[] {
  if (user.roles?.length) {
    return user.roles;
  }

  return user.role ? [user.role] : [];
}
