import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { DatabaseService } from "@/database/database.module";
import type { AuditLogListFilters } from "@/models/AuditLog";

@Injectable()
export class AuditRepository {
  constructor(private readonly db: DatabaseService) {}

  create(data: {
    userId?: string | null;
    tenantId?: string | null;
    action: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.auditLog.create({
      data: {
        userId: data.userId ?? null,
        tenantId: data.tenantId ?? null,
        action: data.action,
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
        metadata: data.metadata ?? undefined,
      },
      include: {
        user: {
          select: { email: true },
        },
      },
    });
  }

  async list(filters: AuditLogListFilters) {
    const page = Math.max(1, filters.page ?? 1);
    const limit = Math.min(100, Math.max(1, filters.limit ?? 25));
    const skip = (page - 1) * limit;

    const where: Prisma.AuditLogWhereInput = {};

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.tenantId) {
      where.tenantId = filters.tenantId;
    }

    if (filters.action) {
      where.action = filters.action;
    }

    if (filters.from || filters.to) {
      where.createdAt = {};
      if (filters.from) {
        where.createdAt.gte = filters.from;
      }
      if (filters.to) {
        where.createdAt.lte = filters.to;
      }
    }

    if (filters.search?.trim()) {
      const term = filters.search.trim();
      where.OR = [
        { userId: { contains: term, mode: "insensitive" } },
        { tenantId: { contains: term, mode: "insensitive" } },
        { action: { contains: term, mode: "insensitive" } },
        { ipAddress: { contains: term, mode: "insensitive" } },
        { userAgent: { contains: term, mode: "insensitive" } },
        { user: { email: { contains: term, mode: "insensitive" } } },
      ];
    }

    const [rows, total] = await Promise.all([
      this.db.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: { email: true },
          },
        },
      }),
      this.db.auditLog.count({ where }),
    ]);

    return { rows, total, page, limit };
  }
}
