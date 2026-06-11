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

export function signAccessTokenForUser(user: AuthTokenPayload): string {
  const payload = {
    sub: user.userId,
    userId: user.userId,
    tenantId: user.tenantId,
    role: user.role as SecurityRole,
    email: user.email,
    type: TOKEN_TYPES.ACCESS,
    ...(user.sessionId ? { sessionId: user.sessionId } : {}),
  } as AccessTokenPayload;

  return signAccessToken(payload, authConfig.jwtExpiresIn, jwtConfig);
}

export function signRefreshTokenForUser(user: AuthTokenPayload): string {
  return signRefreshToken(
    {
      sub: user.userId,
      userId: user.userId,
      tenantId: user.tenantId,
      role: user.role as SecurityRole,
      email: user.email,
      tokenId: user.sessionId,
    },
    authConfig.refreshTokenExpiresIn,
    jwtConfig,
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = verifyToken<AccessTokenPayload>(token, jwtConfig);
  if (payload.type !== TOKEN_TYPES.ACCESS) {
    throw new Error("Invalid access token type");
  }
  return payload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const payload = verifyToken<RefreshTokenPayload>(token, jwtConfig);
  if (payload.type !== "refresh") {
    throw new Error("Invalid refresh token type");
  }
  return payload;
}
