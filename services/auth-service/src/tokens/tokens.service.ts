import { Injectable } from "@nestjs/common";
import { authConfig } from "@ordella/config";
import { hashRefreshToken } from "@ordella/security";
import type { TokenBuilder } from "@/utils/token-builder";
import type { UserRecord } from "@/users/users.mapper";
import { TokensRepository } from "@/tokens/tokens.repository";

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

@Injectable()
export class TokensService {
  constructor(private readonly tokensRepository: TokensRepository) {}

  async issueTokens(input: {
    user: UserRecord;
    sessionId: string;
    opaqueRefreshToken: string;
    ipAddress?: string;
    deviceInfo?: string;
    tokenBuilder: TokenBuilder;
  }) {
    const tokenHash = hashRefreshToken(input.opaqueRefreshToken);
    const expiresAt = new Date(Date.now() + parseDurationToMs(authConfig.refreshTokenExpiresIn));

    await this.tokensRepository.createToken({
      userId: input.user.id,
      sessionId: input.sessionId,
      tokenHash,
      expiresAt,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
    });

    const accessToken = input.tokenBuilder.buildAccessToken({
      userId: input.user.id,
      tenantId: input.user.tenantId,
      role: input.user.role,
      email: input.user.email,
      sessionId: input.sessionId,
    });

    return {
      accessToken,
      refreshToken: input.opaqueRefreshToken,
      sessionId: input.sessionId,
      expiresIn: parseDurationToMs(authConfig.jwtExpiresIn) / 1000,
    };
  }

  async rotateRefreshToken(input: {
    tenantId: string;
    refreshToken: string;
    ipAddress?: string;
    deviceInfo?: string;
    tokenBuilder: TokenBuilder;
  }) {
    const tokenHash = hashRefreshToken(input.refreshToken);
    const stored = await this.tokensRepository.findByTokenHash(tokenHash);

    if (!stored || stored.revokedAt || stored.expiresAt <= new Date()) {
      return null;
    }

    if (stored.user.tenantId !== input.tenantId) {
      return null;
    }

    await this.tokensRepository.deleteById(stored.id);

    const sessionId = input.tokenBuilder.createSessionId();
    const opaqueRefreshToken = input.tokenBuilder.createOpaqueRefreshToken();
    const tokens = await this.issueTokens({
      user: {
        ...stored.user,
        role: stored.user.role as UserRecord["role"],
      },
      sessionId,
      opaqueRefreshToken,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
      tokenBuilder: input.tokenBuilder,
    });

    return { userId: stored.userId, tokens };
  }

  async invalidateRefreshToken(refreshToken: string) {
    const tokenHash = hashRefreshToken(refreshToken);
    await this.tokensRepository.revokeByTokenHash(tokenHash);
  }

  async invalidateAllUserTokens(userId: string) {
    await this.tokensRepository.revokeAllForUser(userId);
  }
}
