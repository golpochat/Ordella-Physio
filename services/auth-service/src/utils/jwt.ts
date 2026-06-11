import { authConfig } from "@ordella/config";
import {
  createJwtConfigFromEnv,
  signAccessToken,
  signRefreshToken,
  verifyToken,
  type AccessTokenPayload,
  type RefreshTokenPayload,
  type SecurityRole,
} from "@ordella/security";
import { TOKEN_TYPES } from "@/constants";
import type { AuthTokenPayload } from "@/types/auth.types";

const jwtConfig = createJwtConfigFromEnv();

export type AuthAccessClaims = AccessTokenPayload & {
  jti?: string;
  tv?: number;
  permissions?: string[];
  sessionId?: string;
};

export type AuthRefreshClaims = RefreshTokenPayload & {
  jti?: string;
  tv?: number;
};

export function buildAccessTokenClaims(user: AuthTokenPayload & { tokenVersion?: number; jti: string }) {
  return {
    sub: user.userId,
    userId: user.userId,
    tenantId: user.tenantId,
    role: user.role as SecurityRole,
    email: user.email,
    type: TOKEN_TYPES.ACCESS,
    jti: user.jti,
    tv: user.tokenVersion ?? 0,
    sessionId: user.jti,
  } as AuthAccessClaims;
}

export function buildRefreshTokenClaims(user: AuthTokenPayload & { tokenVersion?: number; jti: string }) {
  return {
    sub: user.userId,
    userId: user.userId,
    tenantId: user.tenantId,
    role: user.role as SecurityRole,
    email: user.email,
    tokenId: user.jti,
    jti: user.jti,
    tv: user.tokenVersion ?? 0,
  };
}

export function signAccessTokenForUser(
  user: AuthTokenPayload & { tokenVersion?: number; jti: string },
  permissions?: string[],
): string {
  const payload = buildAccessTokenClaims(user);
  if (permissions) {
    payload.permissions = permissions;
  }
  return signAccessToken(payload, authConfig.jwtExpiresIn, jwtConfig);
}

export function signRefreshTokenForUser(user: AuthTokenPayload & { tokenVersion?: number; jti: string }): string {
  return signRefreshToken(
    buildRefreshTokenClaims(user),
    authConfig.refreshTokenExpiresIn,
    jwtConfig,
  );
}

export function verifyAccessToken(token: string): AuthAccessClaims {
  const payload = verifyToken<AuthAccessClaims>(token, jwtConfig);
  if (payload.type !== TOKEN_TYPES.ACCESS) {
    throw new Error("Invalid access token type");
  }
  return payload;
}

export function verifyRefreshToken(token: string): AuthRefreshClaims {
  const payload = verifyToken<AuthRefreshClaims>(token, jwtConfig);
  if (payload.type !== "refresh") {
    throw new Error("Invalid refresh token type");
  }
  return payload;
}

export function getTokenVersionFromPayload(payload: { tv?: number }): number {
  return typeof payload.tv === "number" ? payload.tv : 0;
}
