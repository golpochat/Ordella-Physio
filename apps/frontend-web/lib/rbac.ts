import type { SecurityRole } from "@ordella/security";
import { DASHBOARD_ROUTES } from "./constants";

export type PortalRole = SecurityRole | "PATIENT";

export const ROLE_DASHBOARD_MAP: Record<PortalRole, string> = {
  SYSTEM: DASHBOARD_ROUTES.admin,
  OWNER: DASHBOARD_ROUTES.admin,
  ADMIN: DASHBOARD_ROUTES.clinic,
  THERAPIST: DASHBOARD_ROUTES.therapist,
  STAFF: DASHBOARD_ROUTES.clinic,
  PATIENT: DASHBOARD_ROUTES.patient,
};

export const ROUTE_ROLE_ACCESS: Record<string, PortalRole[]> = {
  [DASHBOARD_ROUTES.admin]: ["SYSTEM", "OWNER"],
  [DASHBOARD_ROUTES.clinic]: ["ADMIN", "STAFF"],
  [DASHBOARD_ROUTES.therapist]: ["THERAPIST"],
  [DASHBOARD_ROUTES.patient]: ["PATIENT"],
  "/appointments": ["ADMIN", "STAFF", "THERAPIST", "PATIENT"],
  "/patients": ["ADMIN", "STAFF", "THERAPIST"],
  "/billing": ["ADMIN", "STAFF", "PATIENT"],
  "/notes": ["ADMIN", "STAFF", "THERAPIST", "PATIENT"],
  "/settings": ["SYSTEM", "OWNER", "ADMIN", "STAFF", "THERAPIST", "PATIENT"],
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
  return primary ? ROLE_DASHBOARD_MAP[primary] : DASHBOARD_ROUTES.patient;
}
