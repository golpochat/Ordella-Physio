import { Injectable } from "@nestjs/common";
import type { AIDeploymentStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { toDeploymentRecord, toMetricRecord } from "@/models/AIModelDeployment";

@Injectable()
export class DeploymentRepository {
  constructor(private readonly db: DatabaseService) {}

  findById(id: string) {
    return this.db.aIModelDeployment.findUnique({ where: { id } });
  }

  findByModel(tenantId: string, modelId: string) {
    return this.db.aIModelDeployment.findFirst({
      where: { tenantId, modelId },
      orderBy: { createdAt: "desc" },
    });
  }

  findByModelVersion(tenantId: string, modelId: string, version: string) {
    return this.db.aIModelDeployment.findUnique({
      where: { tenantId_modelId_version: { tenantId, modelId, version } },
    });
  }

  listByModel(tenantId: string, modelId: string) {
    return this.db.aIModelDeployment.findMany({
      where: { tenantId, modelId },
      orderBy: { createdAt: "desc" },
    });
  }

  create(data: {
    tenantId: string;
    modelId: string;
    version: string;
    regions: string[];
    rollout: Record<string, number>;
    health: Record<string, string>;
    artifactLocation?: string;
    previousDeploymentId?: string;
    pipeline?: unknown;
  }) {
    return this.db.aIModelDeployment.create({
      data: {
        tenantId: data.tenantId,
        modelId: data.modelId,
        version: data.version,
        regions: data.regions,
        rollout: data.rollout,
        health: data.health,
        artifactLocation: data.artifactLocation ?? "",
        previousDeploymentId: data.previousDeploymentId,
        pipeline: data.pipeline ?? [],
        status: "DEPLOYING",
      },
    });
  }

  update(
    id: string,
    data: Partial<{
      regions: string[];
      rollout: Record<string, number>;
      health: Record<string, string>;
      status: AIDeploymentStatus;
      artifactLocation: string;
      pipeline?: Prisma.InputJsonValue;
      failoverRegion: string | null;
    }>,
  ) {
    return this.db.aIModelDeployment.update({ where: { id }, data });
  }

  async getActive(tenantId: string, modelId: string) {
    const row = await this.db.aIModelDeployment.findFirst({
      where: { tenantId, modelId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });
    return row ? toDeploymentRecord(row) : null;
  }

  recordMetric(data: {
    tenantId: string;
    modelId: string;
    version: string;
    region: string;
    requests?: number;
    latencyMs?: number;
    errorRate?: number;
    tokenThroughput?: number;
    memoryUsageMb?: number;
    cpuLoad?: number;
    rolloutPercent?: number;
    canaryStable?: boolean;
  }) {
    return this.db.aIDeploymentMetric.create({ data });
  }

  listMetrics(tenantId: string, modelId: string, version: string, limit = 100) {
    return this.db.aIDeploymentMetric.findMany({
      where: { tenantId, modelId, version },
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  }

  mapMetrics(rows: Awaited<ReturnType<DeploymentRepository["listMetrics"]>>) {
    return rows.map(toMetricRecord);
  }
}
