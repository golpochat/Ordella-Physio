export type RefreshTokenRecord = {
  id: string;
  sessionId: string;
  userId: string;
  tokenHash: string;
  jti: string | null;
  expiresAt: Date;
  deviceInfo: string | null;
  ipAddress: string | null;
  revokedAt: Date | null;
  replacedByTokenId: string | null;
  createdAt: Date;
};
