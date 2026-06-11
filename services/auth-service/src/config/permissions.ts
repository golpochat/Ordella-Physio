import {
  PERMISSION_ROLE_MAP,
  getAllowedRolesForPermission,
  roleHasMappedPermission,
  type RolePermissionKey,
  type SecurityRole,
} from "@ordella/security";

export const PERMISSIONS = PERMISSION_ROLE_MAP;

export type AuthPermission = RolePermissionKey;

export function getPermissionRoles(permission: AuthPermission): SecurityRole[] {
  return getAllowedRolesForPermission(permission);
}

export function hasPermissionForRole(role: SecurityRole, permission: AuthPermission): boolean {
  return roleHasMappedPermission(role, permission);
}
