import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { AuditRepository } from "@/audit/audit.repository";
import type {
  AuditLogEventInput,
  AuditLogListFilters,
  AuditLogListResult,
  AuditLogRecord,
} from "@/models/AuditLog";

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly auditRepository: AuditRepository) {}

  async logEvent(input: AuditLogEventInput): Promise<void> {
    try {
      await this.auditRepository.create({
        userId: input.userId ?? null,
        tenantId: input.tenantId ?? null,
        action: input.action,
        ipAddress: input.ipAddress ?? null,
        userAgent: input.userAgent ?? null,
        metadata: (input.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
      });
    } catch (error) {
      this.logger.error(
        `Failed to write audit log for action ${input.action}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  async list(filters: AuditLogListFilters): Promise<AuditLogListResult> {
    const result = await this.auditRepository.list(filters);

    return {
      data: result.rows.map((row) => this.toRecord(row)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  private toRecord(row: {
    id: string;
    userId: string | null;
    tenantId: string | null;
    action: string;
    ipAddress: string | null;
    userAgent: string | null;
    metadata: Prisma.JsonValue | null;
    createdAt: Date;
    user?: { email: string } | null;
  }): AuditLogRecord {
    return {
      id: row.id,
      userId: row.userId,
      tenantId: row.tenantId,
      action: row.action,
      ipAddress: row.ipAddress,
      userAgent: row.userAgent,
      metadata: this.normalizeMetadata(row.metadata),
      createdAt: row.createdAt,
      userEmail: row.user?.email ?? null,
    };
  }

  private normalizeMetadata(value: Prisma.JsonValue | null): Record<string, unknown> | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }

    return value as Record<string, unknown>;
  }
}
