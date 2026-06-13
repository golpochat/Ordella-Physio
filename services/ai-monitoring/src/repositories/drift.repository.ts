import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiDriftEventRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIDriftEventUncheckedCreateInput) {
    return this.database.aIDriftEvent.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIDriftEvent.findFirst({ where: { id, tenantId } });
  }

  listByModel(tenantId: string, modelId: string, limit = 50) {
    return this.database.aIDriftEvent.findMany({
      where: { tenantId, modelId },
      orderBy: { detectedAt: "desc" },
      take: limit,
    });
  }

  listUnresolved(tenantId: string, modelId: string) {
    return this.database.aIDriftEvent.findMany({
      where: { tenantId, modelId, resolvedAt: null },
      orderBy: { detectedAt: "desc" },
    });
  }

  update(tenantId: string, id: string, data: Prisma.AIDriftEventUpdateInput) {
    return this.database.aIDriftEvent.updateMany({ where: { id, tenantId }, data });
  }
}

@Injectable()
export class AiDriftMetricRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIDriftMetricUncheckedCreateInput) {
    return this.database.aIDriftMetric.create({ data });
  }

  listByModel(tenantId: string, modelId: string, limit = 168) {
    return this.database.aIDriftMetric.findMany({
      where: { tenantId, modelId },
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  }

  findLatest(tenantId: string, modelId: string) {
    return this.database.aIDriftMetric.findFirst({
      where: { tenantId, modelId },
      orderBy: { timestamp: "desc" },
    });
  }
}
