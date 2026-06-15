import { randomUUID } from "node:crypto";

import type { Request } from "express";
import type { Prisma } from "@prisma/client";

import { env } from "../../config";
import { prisma } from "../../lib/prisma";
import { writeAuditLog } from "../utilities/audit.service";

export type SecurityEventType =
  | "rate_limit"
  | "brute_force"
  | "csrf_failure"
  | "invalid_token"
  | "permission_denied"
  | "account_locked"
  | "virus_scan";

export type SecurityEventInput = {
  type: SecurityEventType;
  message: string;
  req?: Request;
  tenantId?: string | null;
  userId?: string | null;
  metadata?: Record<string, unknown>;
};

export function logSecurityEvent(input: SecurityEventInput): void {
  const timestamp = new Date().toISOString();
  const ipAddress = input.req?.ip;
  const userAgent = input.req?.get("user-agent") ?? undefined;
  const tenantId = input.tenantId ?? input.req?.tenantId ?? undefined;
  const userId = input.userId ?? input.req?.user?.id ?? undefined;

  const payload: Prisma.InputJsonObject = {
    level: "security",
    type: input.type,
    message: input.message,
    timestamp,
    tenantId: tenantId ?? null,
    userId: userId ?? null,
    ipAddress: ipAddress ?? null,
    userAgent: userAgent ?? null,
    correlationId: input.req?.correlationId ?? null,
    metadata: (input.metadata ?? null) as Prisma.InputJsonValue,
  };

  console.warn(JSON.stringify(payload));

  void writeAuditLog({
    tenantId: tenantId ?? "system",
    userId,
    action: `security.${input.type}`,
    entity: "SecurityEvent",
    ipAddress,
    userAgent,
    metadata: payload,
  }).catch((error: unknown) => {
    console.error("Failed to persist security audit log", error);
  });

  if (env.SENTRY_DSN) {
    void import("./sentry")
      .then(({ captureSecurityEvent }) => captureSecurityEvent(payload))
      .catch(() => undefined);
  }
}

export async function purgeExpiredRevokedTokens(): Promise<number> {
  const result = await prisma.revokedToken.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  return result.count;
}

export function createCorrelationId(): string {
  return randomUUID();
}
