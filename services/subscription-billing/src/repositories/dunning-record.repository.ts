import { Injectable } from "@nestjs/common";
import type { DunningStatus } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class DunningRecordRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantId(tenantId: string) {
    return this.database.dunningRecord.findUnique({ where: { tenantId } });
  }

  upsertActive(tenantId: string, data: { attemptCount: number; nextRetryAt: Date | null; lastFailedAt: Date }) {
    return this.database.dunningRecord.upsert({
      where: { tenantId },
      create: {
        tenantId,
        attemptCount: data.attemptCount,
        nextRetryAt: data.nextRetryAt,
        lastFailedAt: data.lastFailedAt,
        status: "ACTIVE",
      },
      update: {
        attemptCount: data.attemptCount,
        nextRetryAt: data.nextRetryAt,
        lastFailedAt: data.lastFailedAt,
        status: "ACTIVE",
      },
    });
  }

  resolve(tenantId: string) {
    return this.database.dunningRecord.update({
      where: { tenantId },
      data: { status: "RESOLVED", nextRetryAt: null },
    });
  }

  cancel(tenantId: string) {
    return this.database.dunningRecord.update({
      where: { tenantId },
      data: { status: "CANCELED", nextRetryAt: null },
    });
  }

  listDueRetries(now: Date) {
    return this.database.dunningRecord.findMany({
      where: {
        status: "ACTIVE",
        nextRetryAt: { lte: now },
      },
    });
  }

  updateStatus(tenantId: string, status: DunningStatus) {
    return this.database.dunningRecord.update({
      where: { tenantId },
      data: { status },
    });
  }
}
