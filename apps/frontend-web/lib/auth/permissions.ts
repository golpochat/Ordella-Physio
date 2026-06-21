import {
  PERMISSION_ROLE_MAP,
  normalizeEffectiveRole,
  roleHasMappedPermission,
  type RolePermissionKey,
} from "@ordella/security/rbac";
import { userHasPlatformPermission } from "@/lib/platform-rbac";

export { PERMISSION_ROLE_MAP, type RolePermissionKey, PERMISSIONS, type Permission as AuthPermission } from "@ordella/security/rbac";

export function roleHasPermission(role: string | undefined, permission: RolePermissionKey): boolean {
  if (!role) {
    return false;
  }

  const effectiveRole = normalizeEffectiveRole(role);
  if (effectiveRole && roleHasMappedPermission(effectiveRole as never, permission)) {
    return true;
  }

  return roleHasMappedPermission(role as never, permission);
}

export function userHasPermission(
  user: { role?: string; roles?: string[]; permissions?: string[]; effectiveRole?: string } | null | undefined,
  permission: RolePermissionKey | string,
): boolean {
  if (!user) {
    return false;
  }

  if (userHasPlatformPermission(user, permission)) {
    return true;
  }

  const roles = user.roles?.length ? user.roles : user.role ? [user.role] : [];
  return roles.some((role) => roleHasPermission(role, permission as RolePermissionKey));
}

export { userHasPlatformPermission, PLATFORM_PERMISSIONS } from "@/lib/platform-rbac";
