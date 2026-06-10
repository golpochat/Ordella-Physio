import { createHash, randomBytes } from "node:crypto";
import {
  DEFAULT_ACCESS_TOKEN_EXPIRES_IN,
  DEFAULT_REFRESH_TOKEN_EXPIRES_IN,
} from "../constants/security-headers";
import type { SecurityUser } from "../rbac/rbac.service";
import {
  createJwtConfigFromEnv,
  decodeToken,
  isRefreshTokenPayload,
  signAccessToken,
  signRefreshToken,
  verifyToken,
  type JwtConfig,
  type RefreshTokenPayload,
} from "./jwt";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
};

export type TokenServiceOptions = {
  jwtConfig?: JwtConfig;
  accessTokenExpiresIn?: string;
  refreshTokenExpiresIn?: string;
};

export class TokenService {
  private readonly jwtConfig: JwtConfig;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;
  private readonly refreshTokenStore = new Map<string, RefreshTokenPayload>();

  constructor(options: TokenServiceOptions = {}) {
    this.jwtConfig = options.jwtConfig ?? createJwtConfigFromEnv();
    this.accessTokenExpiresIn = options.accessTokenExpiresIn ?? DEFAULT_ACCESS_TOKEN_EXPIRES_IN;
    this.refreshTokenExpiresIn = options.refreshTokenExpiresIn ?? DEFAULT_REFRESH_TOKEN_EXPIRES_IN;
  }

  generateAuthTokens(user: SecurityUser): AuthTokens {
    const tokenId = randomBytes(16).toString("hex");
    const payload = {
      sub: user.userId,
      userId: user.userId,
      tenantId: user.tenantId,
      role: user.role,
      email: user.email,
      tokenId,
    };

    const accessToken = signAccessToken(payload, this.accessTokenExpiresIn, this.jwtConfig);
    const refreshToken = signRefreshToken(payload, this.refreshTokenExpiresIn, this.jwtConfig);

    this.refreshTokenStore.set(hashRefreshToken(refreshToken), {
      ...payload,
      type: "refresh",
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn: this.accessTokenExpiresIn,
      refreshTokenExpiresIn: this.refreshTokenExpiresIn,
    };
  }

  rotateRefreshToken(oldToken: string): AuthTokens {
    const payload = this.validateRefreshToken(oldToken);
    this.refreshTokenStore.delete(hashRefreshToken(oldToken));

    return this.generateAuthTokens({
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
    });
  }

  validateRefreshToken(token: string): RefreshTokenPayload {
    const payload = verifyToken<RefreshTokenPayload>(token, this.jwtConfig);

    if (!isRefreshTokenPayload(payload)) {
      throw new Error("Invalid refresh token type");
    }

    const stored = this.refreshTokenStore.get(hashRefreshToken(token));
    if (!stored || stored.userId !== payload.userId) {
      throw new Error("Refresh token is not active");
    }

    return payload;
  }

  decodeAccessToken(token: string) {
    return decodeToken(token);
  }
}

export function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createTokenService(options?: TokenServiceOptions): TokenService {
  return new TokenService(options);
}
