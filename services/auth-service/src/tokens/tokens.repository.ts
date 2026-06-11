import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TokensRepository {
  constructor(private readonly db: DatabaseService) {}

  createToken(data: {
    userId: string;
    sessionId: string;
    tokenHash: string;
    jti: string;
    expiresAt: Date;
    deviceInfo?: string;
    ipAddress?: string;
  }) {
    return this.db.refreshToken.create({
      data: {
        userId: data.userId,
        sessionId: data.sessionId,
        tokenHash: data.tokenHash,
        jti: data.jti,
        expiresAt: data.expiresAt,
        deviceInfo: data.deviceInfo,
        ipAddress: data.ipAddress,
      },
    });
  }

  findByTokenHash(tokenHash: string) {
    return this.db.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
  }

  revokeByTokenHash(tokenHash: string, replacedByTokenId?: string) {
    return this.db.refreshToken.update({
      where: { tokenHash },
      data: {
        revokedAt: new Date(),
        ...(replacedByTokenId ? { replacedByTokenId } : {}),
      },
    });
  }

  revokeById(id: string, replacedByTokenId?: string) {
    return this.db.refreshToken.update({
      where: { id },
      data: {
        revokedAt: new Date(),
        ...(replacedByTokenId ? { replacedByTokenId } : {}),
      },
    });
  }

  revokeAllForUser(userId: string) {
    return this.db.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
