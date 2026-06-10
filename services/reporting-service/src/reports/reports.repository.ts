import { Injectable } from "@nestjs/common";
import type { Prisma, ReportRequest } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";
import type { ListReportRequestsInput, ReportStatus, ReportType } from "@ordella/validation";

@Injectable()
export class ReportsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      ReportRequest,
      Prisma.ReportRequestCreateInput,
      Prisma.ReportRequestUpdateInput
    >(this.database.reportRequest as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.ReportRequestCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.ReportRequestCreateInput);
  }

  findById(tenantId: string, id: string) {
    return this.database.reportRequest.findFirst({
      where: { id, tenantId },
    });
  }

  findByIdGlobal(id: string) {
    return this.database.reportRequest.findUnique({ where: { id } });
  }

  async list(tenantId: string, userId: string | undefined, query: ListReportRequestsInput) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.ReportRequestWhereInput = {
      tenantId,
      ...(userId ? { userId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.type ? { type: query.type } : {}),
    };

    const [items, total] = await Promise.all([
      this.database.reportRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.database.reportRequest.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  update(tenantId: string, id: string, data: Prisma.ReportRequestUpdateInput) {
    return this.database.reportRequest.update({
      where: { id, tenantId },
      data,
    });
  }

  claimForProcessing(tenantId: string, id: string) {
    return this.database.reportRequest.updateMany({
      where: { id, tenantId, status: "pending" },
      data: { status: "processing" },
    });
  }

  listAllTenants(status?: ReportStatus, type?: ReportType) {
    return this.database.reportRequest.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }
}
