import { Injectable } from "@nestjs/common";
import { authConfig } from "@ordella/config";
import {
  createJwtConfigFromEnv,
  getPermissionsForRole,
  signAccessToken,
  signRefreshToken,
  type AccessTokenPayload,
  type SecurityRole,
} from "@ordella/security";
import { generateToken } from "@ordella/utils";
import { TOKEN_TYPES } from "@/constants";

export type BuiltTokens = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
};

@Injectable()
export class TokenBuilder {
  private readonly jwtConfig = createJwtConfigFromEnv();

  buildAccessToken(input: {
    userId: string;
    tenantId: string;
    role: SecurityRole;
    email: string;
    sessionId: string;
  }): string {
    const permissions = getPermissionsForRole(input.role);
    const payload = {
      sub: input.userId,
      userId: input.userId,
      tenantId: input.tenantId,
      role: input.role,
      email: input.email,
      type: TOKEN_TYPES.ACCESS,
      permissions,
      sessionId: input.sessionId,
    } as AccessTokenPayload;

    return signAccessToken(payload, authConfig.jwtExpiresIn, this.jwtConfig);
  }

  buildRefreshToken(input: {
    userId: string;
    tenantId: string;
    role: SecurityRole;
    email: string;
    sessionId: string;
  }): string {
    return signRefreshToken(
      {
        sub: input.userId,
        userId: input.userId,
        tenantId: input.tenantId,
        role: input.role,
        email: input.email,
        tokenId: input.sessionId,
      },
      authConfig.refreshTokenExpiresIn,
      this.jwtConfig,
    );
  }

  createSessionId(): string {
    return generateToken(16);
  }

  createOpaqueRefreshToken(): string {
    return generateToken(32);
  }
}
