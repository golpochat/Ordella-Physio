import type { SecurityRole } from "@ordella/security/rbac";
import type { RolePermissionKey } from "@/lib/auth/permissions";
import { roleHasPermission, userHasPlatformPermission } from "@/lib/auth/permissions";
import { DASHBOARD_ROUTES } from "./constants";
import { getPortalForRoles, mapAuthRoleToPortalRole } from "./auth/roleRedirect";
import { canAccessPortalNamespace } from "./routes";

export type PortalRole = SecurityRole | "CLINIC_ADMIN" | "PATIENT" | "PHARMACY" | "USER";

export const ROLE_DASHBOARD_MAP: Record<PortalRole, string> = {
  SYSTEM: DASHBOARD_ROUTES.superAdmin,
  SUPER_ADMIN: DASHBOARD_ROUTES.superAdmin,
  TENANT_OWNER: DASHBOARD_ROUTES.clinic,
  ADMIN: DASHBOARD_ROUTES.admin,
  CLINIC_ADMIN: DASHBOARD_ROUTES.clinic,
  OWNER: DASHBOARD_ROUTES.admin,
  THERAPIST: DASHBOARD_ROUTES.therapist,
  STAFF: DASHBOARD_ROUTES.staff,
  BILLING_ADMIN: DASHBOARD_ROUTES.staff,
  READ_ONLY: DASHBOARD_ROUTES.staff,
  ORG_ADMIN: "/organization",
  ORG_BILLING_ADMIN: "/organization",
  PATIENT: DASHBOARD_ROUTES.patient,
  PHARMACY: DASHBOARD_ROUTES.pharmacy,
  USER: DASHBOARD_ROUTES.user,
};

export const ROUTE_ROLE_ACCESS: Record<string, PortalRole[]> = {
  [DASHBOARD_ROUTES.superAdmin]: ["SYSTEM", "SUPER_ADMIN"],
  [DASHBOARD_ROUTES.admin]: ["OWNER", "ADMIN", "TENANT_OWNER"],
  "/admin/ai": ["OWNER", "ADMIN", "CLINIC_ADMIN", "TENANT_OWNER"],
  [DASHBOARD_ROUTES.clinic]: ["CLINIC_ADMIN", "ADMIN", "OWNER", "TENANT_OWNER"],
  "/organization": ["ORG_ADMIN", "ORG_BILLING_ADMIN"],
  [DASHBOARD_ROUTES.therapist]: ["THERAPIST"],
  [DASHBOARD_ROUTES.patient]: ["PATIENT"],
  [DASHBOARD_ROUTES.pharmacy]: ["PHARMACY"],
  [DASHBOARD_ROUTES.staff]: ["STAFF", "BILLING_ADMIN", "READ_ONLY"],
  [DASHBOARD_ROUTES.user]: ["USER"],
  "/settings": [
    "SYSTEM",
    "SUPER_ADMIN",
    "OWNER",
    "TENANT_OWNER",
    "ADMIN",
    "STAFF",
    "THERAPIST",
    "PATIENT",
    "PHARMACY",
    "USER",
    "ORG_ADMIN",
    "ORG_BILLING_ADMIN",
  ],
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
    return roleHasPermission(userRole, entry as RolePermissionKey) || userHasPlatformPermission({ role: userRole }, entry);
  });
}

export function canAccessRoute(pathname: string, roles: PortalRole[]): boolean {
  if (!canAccessPortalNamespace(pathname, roles)) {
    return false;
  }

  const matches = Object.entries(ROUTE_ROLE_ACCESS).filter(([route]) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  if (!matches.length) {
    return true;
  }

  const [, allowedRoles] = matches.sort(([routeA], [routeB]) => routeB.length - routeA.length)[0]!;
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
