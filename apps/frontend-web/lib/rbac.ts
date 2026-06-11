import type { SecurityRole } from "@ordella/security";
import { PERMISSIONS, roleHasPermission } from "./auth/permissions";
import { DASHBOARD_ROUTES } from "./constants";
import { getPortalForRoles, mapAuthRoleToPortalRole } from "./auth/roleRedirect";

export type PortalRole = SecurityRole | "CLINIC_ADMIN" | "PATIENT" | "PHARMACY" | "USER";

export const ROLE_DASHBOARD_MAP: Record<PortalRole, string> = {
  SYSTEM: DASHBOARD_ROUTES.superAdmin,
  ADMIN: DASHBOARD_ROUTES.admin,
  CLINIC_ADMIN: DASHBOARD_ROUTES.clinic,
  OWNER: DASHBOARD_ROUTES.admin,
  THERAPIST: DASHBOARD_ROUTES.therapist,
  STAFF: DASHBOARD_ROUTES.staff,
  PATIENT: DASHBOARD_ROUTES.patient,
  PHARMACY: DASHBOARD_ROUTES.pharmacy,
  USER: DASHBOARD_ROUTES.user,
};

export const ROUTE_ROLE_ACCESS: Record<string, PortalRole[]> = {
  [DASHBOARD_ROUTES.superAdmin]: ["SYSTEM"],
  [DASHBOARD_ROUTES.admin]: ["OWNER", "ADMIN"],
  [DASHBOARD_ROUTES.clinic]: ["CLINIC_ADMIN"],
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

export function hasPermission(
  userPermissions: string[],
  permission: string | string[],
  userRole?: string,
): boolean {
  const required = Array.isArray(permission) ? permission : [permission];

  if (required.every((entry) => userPermissions.includes(entry))) {
    return true;
  }

  if (!userRole) {
    return false;
  }

  return required.every((entry) => {
    if (!(entry in PERMISSIONS)) {
      return false;
    }
    return roleHasPermission(userRole, entry as keyof typeof PERMISSIONS);
  });
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
  return getPortalForRoles(roles);
}

export function resolveUserRoles(user: {
  role?: PortalRole | string;
  roles?: Array<PortalRole | string>;
}): PortalRole[] {
  if (user.roles?.length) {
    return user.roles.map(mapAuthRoleToPortalRole);
  }

  return user.role ? [mapAuthRoleToPortalRole(user.role)] : [];
}
