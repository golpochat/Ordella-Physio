import { Injectable } from "@nestjs/common";
import type { DashboardSnapshot, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class DashboardsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      DashboardSnapshot,
      Prisma.DashboardSnapshotCreateInput,
      Prisma.DashboardSnapshotUpdateInput
    >(this.database.dashboardSnapshot as never, { tenantId });
  }

  findByType(tenantId: string, dashboardType: string) {
    return this.database.dashboardSnapshot.findUnique({
      where: { tenantId_dashboardType: { tenantId, dashboardType } },
    });
  }

  upsert(
    tenantId: string,
    dashboardType: string,
    payload: Record<string, unknown>,
    expiresAt?: Date,
  ) {
    return this.database.dashboardSnapshot.upsert({
      where: { tenantId_dashboardType: { tenantId, dashboardType } },
      create: {
        tenantId,
        dashboardType,
        payload: payload as never,
        expiresAt,
      },
      update: {
        payload: payload as never,
        generatedAt: new Date(),
        expiresAt,
      },
    });
  }

  deleteExpired(tenantId: string, cutoff: Date) {
    return this.database.dashboardSnapshot.deleteMany({
      where: {
        tenantId,
        expiresAt: { lt: cutoff },
      },
    });
  }
}
