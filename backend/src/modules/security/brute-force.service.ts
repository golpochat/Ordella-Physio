import { env } from "../../config";
import { incrementBruteForceCounter } from "../../lib/redis";
import { prisma } from "../../lib/prisma";
import { AccountLockedError, TooManyRequestsError } from "../../utils/security-errors";
import { logSecurityEvent } from "./security-events.service";

const BRUTE_FORCE_WINDOW_MS = env.LOGIN_LOCKOUT_BASE_MS;

function bruteForceKey(ipAddress: string | undefined, email: string): string {
  return `${ipAddress ?? "unknown"}:${email.toLowerCase()}`;
}

function lockoutDurationMs(attemptCount: number): number {
  const exponent = Math.max(0, attemptCount - env.LOGIN_MAX_ATTEMPTS);
  const duration = env.LOGIN_LOCKOUT_BASE_MS * 2 ** exponent;
  return Math.min(duration, env.LOGIN_LOCKOUT_MAX_MS);
}

async function assertIpEmailRateLimit(ipAddress: string | undefined, email: string): Promise<void> {
  const result = await incrementBruteForceCounter(bruteForceKey(ipAddress, email), BRUTE_FORCE_WINDOW_MS);

  if (result.count > env.LOGIN_MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));

    logSecurityEvent({
      type: "brute_force",
      message: "IP/email login rate limit exceeded",
      metadata: { email, ipAddress, count: result.count, retryAfterSeconds },
    });

    throw new TooManyRequestsError(
      "Too many failed login attempts. Try again later.",
      retryAfterSeconds,
    );
  }
}

export async function assertLoginNotLocked(input: {
  email: string;
  ipAddress?: string;
  tenantId?: string;
}): Promise<void> {
  const email = input.email.toLowerCase();

  await assertIpEmailRateLimit(input.ipAddress, email);

  const user = input.tenantId
    ? await prisma.user.findUnique({
        where: { tenantId_email: { tenantId: input.tenantId, email } },
        select: { lockedUntil: true },
      })
    : null;

  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    const retryAfterSeconds = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000);
    logSecurityEvent({
      type: "account_locked",
      message: "Login attempt while account locked",
      tenantId: input.tenantId,
      metadata: { email, ipAddress: input.ipAddress, retryAfterSeconds },
    });
    throw new AccountLockedError(undefined, retryAfterSeconds);
  }
}

export async function recordLoginAttempt(input: {
  email: string;
  ipAddress?: string;
  tenantId?: string;
  success: boolean;
  reason?: string;
  userId?: string;
}): Promise<void> {
  const email = input.email.toLowerCase();

  await prisma.loginAttempt.create({
    data: {
      email,
      ipAddress: input.ipAddress ?? "unknown",
      tenantId: input.tenantId,
      success: input.success,
      reason: input.reason,
    },
  });

  if (input.success) {
    if (input.userId) {
      await prisma.user.update({
        where: { id: input.userId },
        data: { failedLoginCount: 0, lockedUntil: null },
      });
    }
    return;
  }

  await incrementBruteForceCounter(bruteForceKey(input.ipAddress, email), BRUTE_FORCE_WINDOW_MS);

  logSecurityEvent({
    type: "brute_force",
    message: "Failed login attempt",
    tenantId: input.tenantId,
    userId: input.userId,
    metadata: { email, ipAddress: input.ipAddress, reason: input.reason },
  });

  if (!input.tenantId) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: { tenantId_email: { tenantId: input.tenantId, email } },
    select: { id: true, failedLoginCount: true },
  });

  if (!user) {
    return;
  }

  const failedLoginCount = user.failedLoginCount + 1;
  const update: { failedLoginCount: number; lockedUntil?: Date } = { failedLoginCount };

  if (failedLoginCount >= env.LOGIN_MAX_ATTEMPTS) {
    const lockMs = lockoutDurationMs(failedLoginCount);
    update.lockedUntil = new Date(Date.now() + lockMs);

    logSecurityEvent({
      type: "account_locked",
      message: "Account locked after repeated failed logins",
      tenantId: input.tenantId,
      userId: user.id,
      metadata: { email, ipAddress: input.ipAddress, failedLoginCount, lockMs },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: update,
  });
}
