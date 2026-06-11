import { isSystemRole } from "@/lib/auth/roleRedirect";

export function isSystemPortalUser(role: string | undefined): boolean {
  return isSystemRole(role);
}

export function shouldUseTenantScopedApi(role: string | undefined): boolean {
  if (!role) {
    return false;
  }

  return !isSystemPortalUser(role);
}

export function resolveScopedTenantId(
  role: string | undefined,
  tenantFromStore: string | null | undefined,
  tenantFromUser: string | null | undefined,
): string | null {
  if (!role) {
    return tenantFromStore ?? null;
  }

  if (isSystemPortalUser(role)) {
    return tenantFromStore ?? null;
  }

  return tenantFromStore ?? tenantFromUser ?? null;
}
