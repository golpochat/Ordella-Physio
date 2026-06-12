import { Prisma } from "@/generated/prisma";
import type { AuditLogSearchFilters } from "@/models/AuditLog";

export const LIST_AUDIT_LOG_SORT_FIELDS = [
  "createdAt",
  "action",
  "entityType",
  "entityId",
  "actorUserId",
] as const;

export type AuditLogSortField = (typeof LIST_AUDIT_LOG_SORT_FIELDS)[number];

export function isAuditLogSortField(value: string): value is AuditLogSortField {
  return LIST_AUDIT_LOG_SORT_FIELDS.includes(value as AuditLogSortField);
}

export function buildAuditLogOrderBy(
  sortBy: AuditLogSortField,
  sortOrder: "asc" | "desc",
): Prisma.AuditLogOrderByWithRelationInput {
  return { [sortBy]: sortOrder };
}

export function buildAuditLogWhereClause(
  tenantId: string,
  filters: AuditLogSearchFilters,
): Prisma.AuditLogWhereInput {
  const conditions: Prisma.AuditLogWhereInput[] = [{ tenantId }];

  if (filters.entityTypes?.length) {
    conditions.push({ entityType: { in: filters.entityTypes } });
  } else if (filters.entityType) {
    conditions.push({ entityType: filters.entityType });
  }

  if (filters.entityId) {
    conditions.push({ entityId: filters.entityId });
  }

  if (filters.actions?.length) {
    conditions.push({ action: { in: filters.actions } });
  } else if (filters.action) {
    conditions.push({ action: filters.action });
  }

  if (filters.actorUserIds?.length) {
    conditions.push({ actorUserId: { in: filters.actorUserIds } });
  } else if (filters.actorUserId) {
    conditions.push({ actorUserId: filters.actorUserId });
  }

  if (filters.dateStart || filters.dateEnd) {
    conditions.push({
      createdAt: {
        ...(filters.dateStart ? { gte: filters.dateStart } : {}),
        ...(filters.dateEnd ? { lte: filters.dateEnd } : {}),
      },
    });
  }

  if (filters.keyword) {
    const keyword = filters.keyword.trim();
    conditions.push({
      OR: [
        { action: { contains: keyword, mode: "insensitive" } },
        { entityId: { contains: keyword, mode: "insensitive" } },
      ],
    });
  }

  if (conditions.length === 1) {
    return conditions[0];
  }

  return { AND: conditions };
}

export function buildAuditLogKeywordSqlFragment(keyword: string): Prisma.Sql {
  const pattern = `%${keyword.trim()}%`;
  return Prisma.sql`(
    action ILIKE ${pattern}
    OR "entityId" ILIKE ${pattern}
    OR metadata::text ILIKE ${pattern}
  )`;
}
