import type { AccessTokenPayload } from "@ordella/security";
import { getPermissionsForRole, type Permission, type SecurityRole } from "@ordella/security";

export type AuthUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
};

export function decodeAccessToken(token: string): AccessTokenPayload | null {
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

export function tokenToUser(token: string): AuthUser | null {
  const payload = decodeAccessToken(token);
  if (!payload?.userId || !payload.tenantId || !payload.role) {
    return null;
  }
  return {
    userId: payload.userId,
    tenantId: payload.tenantId,
    role: payload.role,
    email: payload.email,
  };
}

export function userHasPermission(user: AuthUser, permission: Permission): boolean {
  return getPermissionsForRole(user.role).includes(permission);
}

type DecodedAccessToken = AccessTokenPayload & { exp?: number };

export function isTokenExpired(token: string, skewSeconds = 30): boolean {
  const payload = decodeAccessToken(token) as DecodedAccessToken | null;
  if (!payload?.exp) {
    return true;
  }
  return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
}
