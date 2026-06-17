import { Injectable } from "@nestjs/common";
import { authConfig } from "@ordella/config";
import {
  createJwtConfigFromEnv,
  resolvePermissions,
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
    tenantId?: string | null;
    role: SecurityRole;
    email: string;
    sessionId: string;
    jti?: string;
    tokenVersion?: number;
    organizationId?: string | null;
    permissionOverrides?: string[] | null;
  }): string {
    const { effectiveRole, resolvedPermissions } = resolvePermissions({
      role: input.role,
      organizationId: input.organizationId,
      permissionOverrides: input.permissionOverrides,
    });
    const jti = input.jti ?? input.sessionId;
    const payload = {
      sub: input.userId,
      userId: input.userId,
      tenantId: input.tenantId ?? undefined,
      organizationId: input.organizationId ?? undefined,
      role: input.role,
      effectiveRole,
      email: input.email,
      type: TOKEN_TYPES.ACCESS,
      permissions: resolvedPermissions,
      resolvedPermissions,
      sessionId: input.sessionId,
      jti,
      tv: input.tokenVersion ?? 0,
    } as AccessTokenPayload & {
      jti: string;
      tv: number;
      effectiveRole: string;
      resolvedPermissions: string[];
      organizationId?: string;
    };

    return signAccessToken(payload, authConfig.jwtExpiresIn, this.jwtConfig);
  }

  buildRefreshToken(input: {
    userId: string;
    tenantId?: string | null;
    role: SecurityRole;
    email: string;
    sessionId: string;
  }): string {
    return signRefreshToken(
      {
        sub: input.userId,
        userId: input.userId,
        tenantId: input.tenantId ?? undefined,
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
