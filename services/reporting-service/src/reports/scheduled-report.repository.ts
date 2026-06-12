import { Injectable } from "@nestjs/common";
import type { Prisma, ScheduledReport } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class ScheduledReportRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.ScheduledReportCreateInput) {
    return this.database.scheduledReport.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.scheduledReport.findFirst({
      where: { id, tenantId },
      include: { savedReport: true },
    });
  }

  listByTenant(tenantId: string) {
    return this.database.scheduledReport.findMany({
      where: { tenantId },
      include: { savedReport: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findDue(now: Date) {
    return this.database.scheduledReport.findMany({
      where: {
        status: "ACTIVE",
        nextRunAt: { lte: now },
      },
      include: { savedReport: true },
    });
  }

  update(tenantId: string, id: string, data: Prisma.ScheduledReportUpdateInput) {
    return this.database.scheduledReport.updateMany({
      where: { id, tenantId },
      data,
    });
  }
}

export function toScheduledReportResponse(report: ScheduledReport & { savedReport?: { name: string; type: string } | null }) {
  return {
    id: report.id,
    tenantId: report.tenantId,
    savedReportId: report.savedReportId,
    savedReportName: report.savedReport?.name,
    savedReportType: report.savedReport?.type,
    frequency: report.frequency,
    timeOfDay: report.timeOfDay,
    dayOfWeek: report.dayOfWeek,
    dayOfMonth: report.dayOfMonth,
    recipients: report.recipients,
    lastRunAt: report.lastRunAt?.toISOString() ?? null,
    nextRunAt: report.nextRunAt?.toISOString() ?? null,
    status: report.status,
    createdByUserId: report.createdByUserId,
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
  };
}
