import {
  PERMISSION_ROLE_MAP,
  normalizeEffectiveRole,
  roleHasMappedPermission,
  type RolePermissionKey,
} from "@ordella/security/rbac";
import { userHasPlatformPermission } from "@/lib/platform-rbac";

export { PERMISSION_ROLE_MAP, type RolePermissionKey, PERMISSIONS, type Permission as AuthPermission } from "@ordella/security/rbac";

/** Clinic AI platform permissions (until workspace security package is rebuilt in ordella-base). */
const CLINIC_AI_ADMIN_ROLES = [
  "SUPER_ADMIN",
  "SYSTEM",
  "TENANT_OWNER",
  "OWNER",
  "ADMIN",
  "CLINIC_ADMIN",
] as const;

const LOCAL_AI_PERMISSION_ROLES: Record<string, readonly string[]> = {
  "ai.model.view": CLINIC_AI_ADMIN_ROLES,
  "ai.model.manage": CLINIC_AI_ADMIN_ROLES,
  "ai.dataset.view": CLINIC_AI_ADMIN_ROLES,
  "ai.dataset.manage": CLINIC_AI_ADMIN_ROLES,
  "ai.dataset.label": CLINIC_AI_ADMIN_ROLES,
  "ai.training.view": CLINIC_AI_ADMIN_ROLES,
  "ai.training.manage": CLINIC_AI_ADMIN_ROLES,
  "ai.use": [...CLINIC_AI_ADMIN_ROLES, "THERAPIST"],
  "ai.manage": CLINIC_AI_ADMIN_ROLES,
  "ai.admin": CLINIC_AI_ADMIN_ROLES,
  "ai.evaluation.run": CLINIC_AI_ADMIN_ROLES,
  "ai.promotion.manage": CLINIC_AI_ADMIN_ROLES,
  "ai.drift.view": CLINIC_AI_ADMIN_ROLES,
  "ai.drift.mitigate": CLINIC_AI_ADMIN_ROLES,
};

function roleMatchesAllowed(role: string, allowed: readonly string[]): boolean {
  const upper = role.toUpperCase();
  const effective = normalizeEffectiveRole(role);
  const candidates = new Set(
    [upper, effective, role, effective === "ADMIN" ? "CLINIC_ADMIN" : null].filter(Boolean) as string[],
  );

  return allowed.some((entry) => candidates.has(entry));
}

function roleHasLocalAiPermission(role: string | undefined, permission: string): boolean {
  if (!role) {
    return false;
  }

  const allowed = LOCAL_AI_PERMISSION_ROLES[permission];
  if (!allowed) {
    return false;
  }

  return roleMatchesAllowed(role, allowed);
}

export function roleHasPermission(role: string | undefined, permission: RolePermissionKey): boolean {
  if (!role) {
    return false;
  }

  if (roleHasLocalAiPermission(role, permission)) {
    return true;
  }

  if (!(permission in PERMISSION_ROLE_MAP)) {
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
