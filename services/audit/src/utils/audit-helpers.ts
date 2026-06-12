import type { AuditLog } from "@/generated/prisma";
import type { Prisma } from "@/generated/prisma";
import type { AuditLogRecord } from "@/models/AuditLog";

export type AuthenticatedAuditUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export type CreateAuditLogContext = {
  ipAddress?: string;
  userAgent?: string;
  user?: AuthenticatedAuditUser;
};

function normalizeMetadata(value: Prisma.JsonValue | null): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

export function toAuditLogResponse(record: AuditLog): AuditLogRecord {
  return {
    id: record.id,
    tenantId: record.tenantId,
    actorUserId: record.actorUserId,
    actorRole: record.actorRole,
    ipAddress: record.ipAddress,
    userAgent: record.userAgent,
    entityType: record.entityType,
    entityId: record.entityId,
    action: record.action,
    metadata: normalizeMetadata(record.metadata),
    createdAt: record.createdAt.toISOString(),
  };
}
