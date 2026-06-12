import { Injectable } from "@nestjs/common";
import type { Prisma, SavedReport, SavedReportType } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { ListSavedReportsInput } from "@ordella/validation";

@Injectable()
export class SavedReportRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.SavedReportCreateInput) {
    return this.database.savedReport.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.savedReport.findFirst({
      where: { id, tenantId },
    });
  }

  async list(tenantId: string, query: ListSavedReportsInput) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.SavedReportWhereInput = {
      tenantId,
      ...(query.type ? { type: query.type as SavedReportType } : {}),
    };

    const [items, total] = await Promise.all([
      this.database.savedReport.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.database.savedReport.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  update(tenantId: string, id: string, data: Prisma.SavedReportUpdateInput) {
    return this.database.savedReport.updateMany({
      where: { id, tenantId },
      data,
    });
  }

  delete(tenantId: string, id: string) {
    return this.database.savedReport.deleteMany({
      where: { id, tenantId },
    });
  }
}

export function toSavedReportResponse(report: SavedReport) {
  return {
    id: report.id,
    tenantId: report.tenantId,
    name: report.name,
    type: report.type,
    config: report.config,
    createdByUserId: report.createdByUserId,
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
  };
}
