import { Injectable } from "@nestjs/common";
import { authConfig } from "@ordella/config";
import { hashRefreshToken } from "@ordella/security";
import { UsersService } from "@/users/users.service";
import { TokensRepository } from "@/tokens/tokens.repository";
import { AuditService } from "@/services/audit.service";
import { TokenBuilder } from "@/utils/token-builder";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
import type { UserRecord } from "@/users/users.mapper";
import {
  invalidRefreshTokenError,
  tokenReuseDetectedError,
  tokenRevokedError,
} from "@/utils/auth-errors";
import { signRefreshTokenForUser, verifyRefreshToken, getTokenVersionFromPayload } from "@/utils/jwt";

function parseDurationToMs(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }
  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers: Record<string, number> = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return amount * (multipliers[unit] ?? 1000);
}

export type IssuedTokens = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly tokensRepository: TokensRepository,
    private readonly usersService: UsersService,
    private readonly tokenBuilder: TokenBuilder,
    private readonly auditService: AuditService,
  ) {}

  async issueTokens(input: {
    user: UserRecord;
    ipAddress?: string;
    deviceInfo?: string;
  }): Promise<IssuedTokens> {
    const jti = this.tokenBuilder.createSessionId();
    const refreshToken = signRefreshTokenForUser({
      userId: input.user.id,
      tenantId: input.user.tenantId,
      role: input.user.role,
      email: input.user.email,
      sessionId: jti,
      jti,
      tokenVersion: input.user.tokenVersion ?? 0,
    });

    const tokenHash = hashRefreshToken(refreshToken);
    const expiresAt = new Date(Date.now() + parseDurationToMs(authConfig.refreshTokenExpiresIn));

    await this.tokensRepository.createToken({
      userId: input.user.id,
      sessionId: jti,
      tokenHash,
      jti,
      expiresAt,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
    });

    const accessToken = this.tokenBuilder.buildAccessToken({
      userId: input.user.id,
      tenantId: input.user.tenantId,
      role: input.user.role,
      email: input.user.email,
      sessionId: jti,
      jti,
      tokenVersion: input.user.tokenVersion ?? 0,
    });

    return {
      accessToken,
      refreshToken,
      sessionId: jti,
      expiresIn: parseDurationToMs(authConfig.jwtExpiresIn) / 1000,
    };
  }

  async rotateRefreshToken(input: {
    tenantId: string;
    refreshToken: string;
    ipAddress?: string;
    deviceInfo?: string;
  }): Promise<{ userId: string; tenantId: string; tokens: IssuedTokens }> {
    let payload;
    try {
      payload = verifyRefreshToken(input.refreshToken);
    } catch {
      throw invalidRefreshTokenError();
    }

    if (payload.tenantId !== input.tenantId) {
      throw invalidRefreshTokenError();
    }

    const tokenHash = hashRefreshToken(input.refreshToken);
    const stored = await this.tokensRepository.findByTokenHash(tokenHash);

    if (stored) {
      if (stored.revokedAt) {
        await this.handleReuseDetected(stored.userId, stored.user.tenantId, {
          ipAddress: input.ipAddress,
          userAgent: input.deviceInfo,
        });
        throw tokenReuseDetectedError();
      }

      if (stored.expiresAt <= new Date()) {
        throw invalidRefreshTokenError();
      }

      if ((stored.user.tokenVersion ?? 0) !== getTokenVersionFromPayload(payload)) {
        throw tokenRevokedError();
      }

      const user = {
        ...stored.user,
        role: stored.user.role as UserRecord["role"],
      };

      const tokens = await this.issueRotatedTokens(user, stored.id, input.ipAddress, input.deviceInfo);
      return { userId: stored.userId, tenantId: user.tenantId, tokens };
    }

    const user = await this.usersService.findById(payload.tenantId, payload.userId);
    if (!user) {
      throw invalidRefreshTokenError();
    }

    if ((user.tokenVersion ?? 0) !== getTokenVersionFromPayload(payload)) {
      throw tokenRevokedError();
    }

    await this.handleReuseDetected(user.id, user.tenantId, {
      ipAddress: input.ipAddress,
      userAgent: input.deviceInfo,
    });
    throw tokenReuseDetectedError();
  }

  async revokeToken(
    refreshToken: string,
    metadata?: { ipAddress?: string; userAgent?: string },
  ) {
    const tokenHash = hashRefreshToken(refreshToken);
    const stored = await this.tokensRepository.findByTokenHash(tokenHash);

    if (!stored) {
      return { message: "Logged out successfully" };
    }

    if (!stored.revokedAt) {
      await this.tokensRepository.revokeByTokenHash(tokenHash);
    }

    await this.auditService.logEvent({
      userId: stored.userId,
      tenantId: stored.user.tenantId,
      action: AUDIT_ACTIONS.LOGOUT,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { sessionId: stored.sessionId },
    });

    return { message: "Logged out successfully" };
  }

  async invalidateRefreshToken(refreshToken: string) {
    return this.revokeToken(refreshToken);
  }

  async invalidateAllUserTokens(userId: string, tenantId?: string) {
    await this.tokensRepository.revokeAllForUser(userId);
    if (tenantId) {
      await this.usersService.incrementTokenVersion(tenantId, userId);
    }
  }

  private async issueRotatedTokens(
    user: UserRecord,
    previousTokenId: string,
    ipAddress?: string,
    deviceInfo?: string,
  ): Promise<IssuedTokens> {
    const jti = this.tokenBuilder.createSessionId();
    const refreshToken = signRefreshTokenForUser({
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      email: user.email,
      sessionId: jti,
      jti,
      tokenVersion: user.tokenVersion ?? 0,
    });

    const tokenHash = hashRefreshToken(refreshToken);
    const expiresAt = new Date(Date.now() + parseDurationToMs(authConfig.refreshTokenExpiresIn));

    const newRecord = await this.tokensRepository.createToken({
      userId: user.id,
      sessionId: jti,
      tokenHash,
      jti,
      expiresAt,
      ipAddress,
      deviceInfo,
    });

    await this.tokensRepository.revokeById(previousTokenId, newRecord.id);

    const accessToken = this.tokenBuilder.buildAccessToken({
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      email: user.email,
      sessionId: jti,
      jti,
      tokenVersion: user.tokenVersion ?? 0,
    });

    return {
      accessToken,
      refreshToken,
      sessionId: jti,
      expiresIn: parseDurationToMs(authConfig.jwtExpiresIn) / 1000,
    };
  }

  private async handleReuseDetected(
    userId: string,
    tenantId: string,
    context?: { ipAddress?: string; userAgent?: string },
  ) {
    await this.auditService.logEvent({
      userId,
      tenantId,
      action: AUDIT_ACTIONS.TOKEN_REUSE_DETECTED,
      ipAddress: context?.ipAddress,
      userAgent: context?.userAgent,
      metadata: { severity: "high" },
    });

    await this.usersService.incrementTokenVersion(tenantId, userId);
    await this.tokensRepository.revokeAllForUser(userId);
  }
}
