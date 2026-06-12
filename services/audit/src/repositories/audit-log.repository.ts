import { Injectable } from "@nestjs/common";
import type { AuditLog, Prisma } from "@/generated/prisma";
import { Prisma as PrismaClient } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { AuditLogSearchFilters, ListAuditLogsQuery } from "@/models/AuditLog";
import {
  buildAuditLogKeywordSqlFragment,
  buildAuditLogOrderBy,
  buildAuditLogWhereClause,
} from "@/utils/audit-search-builder";

export type AuditLogCreateInput = {
  tenantId: string;
  actorUserId: string;
  actorRole?: string;
  ipAddress?: string;
  userAgent?: string;
  entityType: string;
  entityId: string;
  action: string;
  metadata?: Record<string, unknown>;
};

type SearchQuery = AuditLogSearchFilters & {
  page?: number;
  limit?: number;
};

@Injectable()
export class AuditLogRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: AuditLogCreateInput): Promise<AuditLog> {
    return this.database.auditLog.create({
      data: {
        tenantId: data.tenantId,
        actorUserId: data.actorUserId,
        actorRole: data.actorRole ?? null,
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
        entityType: data.entityType,
        entityId: data.entityId,
        action: data.action,
        metadata: data.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  private usesMetadataKeywordSearch(filters: AuditLogSearchFilters): boolean {
    return Boolean(filters.keyword?.trim());
  }

  private buildPrismaWhere(tenantId: string, filters: AuditLogSearchFilters): Prisma.AuditLogWhereInput {
    if (!this.usesMetadataKeywordSearch(filters)) {
      return buildAuditLogWhereClause(tenantId, filters);
    }

    const { keyword: _keyword, ...rest } = filters;
    return buildAuditLogWhereClause(tenantId, rest);
  }

  private buildKeywordSqlConditions(
    tenantId: string,
    filters: AuditLogSearchFilters,
  ): PrismaClient.Sql {
    const clauses: PrismaClient.Sql[] = [PrismaClient.sql`"tenantId" = ${tenantId}`];

    if (filters.entityTypes?.length) {
      clauses.push(PrismaClient.sql`"entityType" IN (${PrismaClient.join(filters.entityTypes)})`);
    } else if (filters.entityType) {
      clauses.push(PrismaClient.sql`"entityType" = ${filters.entityType}`);
    }

    if (filters.entityId) {
      clauses.push(PrismaClient.sql`"entityId" = ${filters.entityId}`);
    }

    if (filters.actions?.length) {
      clauses.push(PrismaClient.sql`action IN (${PrismaClient.join(filters.actions)})`);
    } else if (filters.action) {
      clauses.push(PrismaClient.sql`action = ${filters.action}`);
    }

    if (filters.actorUserIds?.length) {
      clauses.push(PrismaClient.sql`"actorUserId" IN (${PrismaClient.join(filters.actorUserIds)})`);
    } else if (filters.actorUserId) {
      clauses.push(PrismaClient.sql`"actorUserId" = ${filters.actorUserId}`);
    }

    if (filters.dateStart) {
      clauses.push(PrismaClient.sql`"createdAt" >= ${filters.dateStart}`);
    }

    if (filters.dateEnd) {
      clauses.push(PrismaClient.sql`"createdAt" <= ${filters.dateEnd}`);
    }

    if (filters.keyword?.trim()) {
      clauses.push(buildAuditLogKeywordSqlFragment(filters.keyword));
    }

    return PrismaClient.join(clauses, " AND ");
  }

  private getSortColumn(filters: AuditLogSearchFilters): string {
    const sortBy = filters.sortBy ?? "createdAt";
    return sortBy;
  }

  private getSortOrder(filters: AuditLogSearchFilters): "asc" | "desc" {
    return filters.sortOrder ?? "desc";
  }

  private async findManyWithKeyword(
    tenantId: string,
    filters: SearchQuery,
  ): Promise<AuditLog[]> {
    const whereSql = this.buildKeywordSqlConditions(tenantId, filters);
    const sortColumn = this.getSortColumn(filters);
    const sortOrder = this.getSortOrder(filters);
    const skip = ((filters.page ?? 1) - 1) * (filters.limit ?? 20);
    const take = filters.limit ?? 20;

    return this.database.$queryRaw<AuditLog[]>`
      SELECT *
      FROM audit_logs
      WHERE ${whereSql}
      ORDER BY ${PrismaClient.raw(`"${sortColumn}" ${sortOrder.toUpperCase()}`)}
      LIMIT ${take}
      OFFSET ${skip}
    `;
  }

  private async countWithKeyword(tenantId: string, filters: AuditLogSearchFilters): Promise<number> {
    const whereSql = this.buildKeywordSqlConditions(tenantId, filters);
    const result = await this.database.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::bigint AS count
      FROM audit_logs
      WHERE ${whereSql}
    `;

    return Number(result[0]?.count ?? 0);
  }

  findManyFiltered(tenantId: string, query: ListAuditLogsQuery): Promise<AuditLog[]> {
    if (this.usesMetadataKeywordSearch(query)) {
      return this.findManyWithKeyword(tenantId, query);
    }

    const { page, limit, ...filters } = query;
    const orderBy = buildAuditLogOrderBy(filters.sortBy ?? "createdAt", filters.sortOrder ?? "desc");

    return this.database.auditLog.findMany({
      where: this.buildPrismaWhere(tenantId, filters),
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
    });
  }

  countFiltered(tenantId: string, query: AuditLogSearchFilters): Promise<number> {
    if (this.usesMetadataKeywordSearch(query)) {
      return this.countWithKeyword(tenantId, query);
    }

    return this.database.auditLog.count({
      where: this.buildPrismaWhere(tenantId, query),
    });
  }

  findAllFiltered(tenantId: string, query: AuditLogSearchFilters, maxRows = 10_000): Promise<AuditLog[]> {
    if (this.usesMetadataKeywordSearch(query)) {
      return this.findManyWithKeyword(tenantId, { ...query, page: 1, limit: maxRows });
    }

    const orderBy = buildAuditLogOrderBy(query.sortBy ?? "createdAt", query.sortOrder ?? "desc");

    return this.database.auditLog.findMany({
      where: this.buildPrismaWhere(tenantId, query),
      take: maxRows,
      orderBy,
    });
  }
}
