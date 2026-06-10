import type { Permission } from "../../../packages/security/src/rbac/permissions";
import { roleAtLeast, type SecurityRole } from "../../../packages/security/src/rbac/roles";
import { NAV_ITEMS } from "./constants";

export type AdminRole = SecurityRole;

export const ROUTE_ROLE_ACCESS: Record<string, SecurityRole[]> = {
  "/": ["SYSTEM", "OWNER", "ADMIN", "STAFF", "THERAPIST"],
  "/users": ["SYSTEM", "OWNER", "ADMIN"],
  "/tenants": ["SYSTEM", "OWNER"],
  "/patients": ["SYSTEM", "OWNER", "ADMIN", "STAFF", "THERAPIST"],
  "/appointments": ["SYSTEM", "OWNER", "ADMIN", "STAFF", "THERAPIST"],
  "/notes": ["SYSTEM", "OWNER", "ADMIN", "STAFF", "THERAPIST"],
  "/billing": ["SYSTEM", "OWNER", "ADMIN", "STAFF"],
  "/payments": ["SYSTEM", "OWNER", "ADMIN", "STAFF"],
  "/communication": ["SYSTEM", "OWNER", "ADMIN", "STAFF"],
  "/reporting": ["SYSTEM", "OWNER", "ADMIN"],
};

export function hasRole(userRoles: SecurityRole[], required: SecurityRole | SecurityRole[]): boolean {
  const requiredRoles = Array.isArray(required) ? required : [required];
  return requiredRoles.some((role) => userRoles.some((userRole) => roleAtLeast(userRole, role)));
}

export function hasPermission(userPermissions: string[], permission: Permission | string | string[]): boolean {
  const required = Array.isArray(permission) ? permission : [permission];
  return required.every((entry) => userPermissions.includes(entry));
}

export function canAccessRoute(pathname: string, roles: SecurityRole[]): boolean {
  const matched = Object.entries(ROUTE_ROLE_ACCESS).find(
    ([route]) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!matched) {
    return true;
  }

  const [, allowedRoles] = matched;
  return hasRole(roles, allowedRoles);
}

export function getNavItemsForRole(roles: SecurityRole[]) {
  return NAV_ITEMS.filter((item) => canAccessRoute(item.href, roles));
}
