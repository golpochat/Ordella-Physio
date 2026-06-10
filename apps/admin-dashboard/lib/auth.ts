import type { AccessTokenPayload } from "../../../packages/security/src/auth/jwt";
import type { Permission } from "../../../packages/security/src/rbac/permissions";
import { getPermissionsForRole } from "../../../packages/security/src/rbac/rbac.service";
import type { SecurityRole } from "../../../packages/security/src/rbac/roles";
import type { AuthUser } from "@/store/auth.store";

export function parseAccessToken(token: string): AccessTokenPayload | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) {
      return null;
    }
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const json = globalThis.atob(padded);
    return JSON.parse(json) as AccessTokenPayload;
  } catch {
    return null;
  }
}

export function tokenToAuthUser(token: string): AuthUser | null {
  const payload = parseAccessToken(token);
  if (!payload?.userId || !payload.tenantId || !payload.role) {
    return null;
  }

  const permissions = getPermissionsForRole(payload.role as SecurityRole);

  return {
    id: payload.userId,
    email: payload.email ?? "",
    tenantId: payload.tenantId,
    role: payload.role as SecurityRole,
    roles: [payload.role as SecurityRole],
    permissions: permissions as string[],
  };
}

export function isTokenExpired(token: string, skewSeconds = 30): boolean {
  const payload = parseAccessToken(token) as (AccessTokenPayload & { exp?: number }) | null;
  if (!payload || typeof payload.exp !== "number") {
    return true;
  }
  return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
}

export function userHasPermission(user: AuthUser, permission: Permission | string): boolean {
  return user.permissions.includes(permission);
}

export function setAuthCookies(accessToken: string, refreshToken: string, tenantId: string) {
  if (typeof document === "undefined") {
    return;
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `ordella_access_token=${accessToken}; Path=/; SameSite=Lax${secure}`;
  document.cookie = `ordella_refresh_token=${refreshToken}; Path=/; SameSite=Lax${secure}`;
  document.cookie = `ordella_tenant_id=${tenantId}; Path=/; SameSite=Lax${secure}`;
}

export function clearAuthCookies() {
  if (typeof document === "undefined") {
    return;
  }
  for (const name of ["ordella_access_token", "ordella_refresh_token", "ordella_tenant_id"]) {
    document.cookie = `${name}=; Path=/; Max-Age=0`;
  }
}
