import { normalizePermissionKey, type PlatformPermission } from "./platform-permissions";
import {
  getPlatformPermissionsForRole,
  PLATFORM_ROLE_PERMISSIONS,
} from "./platform-role-permissions";
import {
  normalizeEffectiveRole,
  type EffectiveRole,
} from "./platform-roles";

export type ResolvedRbacContext = {
  effectiveRole: EffectiveRole;
  resolvedPermissions: string[];
};

export function resolveEffectiveRole(
  role: string | undefined | null,
  organizationId?: string | null,
): EffectiveRole | null {
  const normalized = normalizeEffectiveRole(role);
  if (normalized) {
    return normalized;
  }

  if (organizationId) {
    return "ORG_ADMIN";
  }

  return null;
}

/** Permissions are additive: role permissions ∪ optional overrides (never subtractive). */
export function resolvePermissions(input: {
  role: string;
  permissionOverrides?: string[] | null;
  organizationId?: string | null;
}): ResolvedRbacContext {
  const effectiveRole =
    resolveEffectiveRole(input.role, input.organizationId) ?? normalizeEffectiveRole("STAFF")!;

  const rolePermissions = getPlatformPermissionsForRole(effectiveRole);
  const overrides = (input.permissionOverrides ?? []).map(normalizePermissionKey);

  const merged = new Set<string>([...rolePermissions, ...overrides]);

  return {
    effectiveRole,
    resolvedPermissions: [...merged],
  };
}

export function hasResolvedPermission(
  resolvedPermissions: string[],
  required: string,
  effectiveRole?: EffectiveRole | null,
): boolean {
  if (effectiveRole === "SUPER_ADMIN") {
    return true;
  }

  const normalized = normalizePermissionKey(required);
  return resolvedPermissions.includes(normalized) || resolvedPermissions.includes(required);
}

export function buildPermissionRoleMap(): Record<string, EffectiveRole[]> {
  const map = new Map<string, Set<EffectiveRole>>();

  for (const [role, permissions] of Object.entries(PLATFORM_ROLE_PERMISSIONS) as Array<
    [EffectiveRole, PlatformPermission[]]
  >) {
    for (const permission of permissions) {
      const bucket = map.get(permission) ?? new Set<EffectiveRole>();
      bucket.add(role);
      map.set(permission, bucket);
    }
  }

  const output: Record<string, EffectiveRole[]> = {};
  for (const [permission, roles] of map.entries()) {
    output[permission] = [...roles];
  }
  return output;
}
