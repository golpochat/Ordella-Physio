import { prisma } from "../../lib/prisma";

export async function isAccessTokenRevoked(jti: string): Promise<boolean> {
  const revoked = await prisma.revokedToken.findUnique({ where: { jti } });
  return Boolean(revoked);
}

export async function revokeAccessToken(input: {
  jti: string;
  userId: string;
  tenantId?: string;
  expiresAt: Date;
}): Promise<void> {
  await prisma.revokedToken.upsert({
    where: { jti: input.jti },
    create: {
      jti: input.jti,
      userId: input.userId,
      tenantId: input.tenantId,
      expiresAt: input.expiresAt,
    },
    update: {
      revokedAt: new Date(),
    },
  });
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  });
}

export async function getUserTokenVersion(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tokenVersion: true },
  });
  return user?.tokenVersion ?? 0;
}
