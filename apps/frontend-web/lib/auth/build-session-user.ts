import { resolvePermissions } from "@ordella/security/rbac";

import type { SessionUser } from "@/lib/auth/session-types";

type AuthSessionSource = {
  id: string;
  role?: string;
  roles?: string[];
  tenantId?: string;
  organizationId?: string | null;
  effectiveRole?: string;
  permissions?: string[];
  resolvedPermissions?: string[];
  permissionOverrides?: string[] | null;
};

/** Canonical permissions from platform RBAC — do not trust stale API `permissions` arrays. */
export function resolveSessionPermissions(input: {
  role?: string;
  roles?: string[];
  organizationId?: string | null;
  permissionOverrides?: string[] | null;
}): { effectiveRole: string; permissions: string[] } {
  const role = input.roles?.[0] ?? input.role ?? "STAFF";
  const resolved = resolvePermissions({
    role,
    organizationId: input.organizationId,
    permissionOverrides: input.permissionOverrides,
  });

  return {
    effectiveRole: resolved.effectiveRole,
    permissions: resolved.resolvedPermissions,
  };
}

export function buildSessionUser(
  user: AuthSessionSource,
  tenantIdOverride?: string | null,
): SessionUser {
  const role = user.roles?.[0] ?? user.role ?? "STAFF";
  const { effectiveRole, permissions } = resolveSessionPermissions({
    role: user.role,
    roles: user.roles,
    organizationId: user.organizationId,
    permissionOverrides: user.permissionOverrides,
  });

  return {
    id: user.id,
    role,
    effectiveRole: user.effectiveRole ?? effectiveRole,
    tenantId: tenantIdOverride ?? user.tenantId,
    organizationId: user.organizationId,
    roles: user.roles,
    permissions,
    resolvedPermissions: permissions,
  };
}
