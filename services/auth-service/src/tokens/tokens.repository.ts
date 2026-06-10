import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TokensRepository {
  constructor(private readonly db: DatabaseService) {}

  createToken(data: {
    userId: string;
    sessionId: string;
    tokenHash: string;
    expiresAt: Date;
    deviceInfo?: string;
    ipAddress?: string;
  }) {
    return this.db.refreshToken.create({ data });
  }

  findByTokenHash(tokenHash: string) {
    return this.db.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
  }

  revokeByTokenHash(tokenHash: string) {
    return this.db.refreshToken.update({
      where: { tokenHash },
      data: { revokedAt: new Date() },
    });
  }

  revokeAllForUser(userId: string) {
    return this.db.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  deleteById(id: string) {
    return this.db.refreshToken.delete({ where: { id } });
  }
}
