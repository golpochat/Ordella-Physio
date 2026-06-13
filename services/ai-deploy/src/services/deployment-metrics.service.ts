import { Injectable } from "@nestjs/common";
import type { DeploymentMetricsSummary, HealthMap } from "@/models/AIModelDeployment";
import { toMetricRecord } from "@/models/AIModelDeployment";
import { DeploymentRepository } from "@/repositories/deployment.repository";

@Injectable()
export class DeploymentMetricsService {
  constructor(private readonly repository: DeploymentRepository) {}

  async collectSnapshot(tenantId: string, modelId: string, version: string, region: string, rolloutPercent: number) {
    const requests = Math.round(50 + Math.random() * 200);
    const latencyMs = 30 + Math.random() * 60;
    const errorRate = rolloutPercent < 100 ? 0.01 + Math.random() * 0.04 : Math.random() * 0.02;

    await this.repository.recordMetric({
      tenantId,
      modelId,
      version,
      region,
      requests,
      latencyMs,
      errorRate,
      tokenThroughput: Math.round(600 + Math.random() * 500),
      memoryUsageMb: Math.round(1000 + Math.random() * 400),
      cpuLoad: Number((0.2 + Math.random() * 0.5).toFixed(2)),
      rolloutPercent,
      canaryStable: errorRate < 0.05,
    });
  }

  async getMetrics(tenantId: string, modelId: string, version?: string): Promise<DeploymentMetricsSummary> {
    const deployment = version
      ? await this.repository.findByModelVersion(tenantId, modelId, version)
      : await this.repository.findByModel(tenantId, modelId);

    if (!deployment) {
      return {
        modelId,
        version: version ?? "",
        byRegion: {},
        series: [],
        failoverActive: false,
        failoverRegion: null,
      };
    }

    const rows = await this.repository.listMetrics(tenantId, modelId, deployment.version, 200);
    const series = this.repository.mapMetrics(rows);
    const health = deployment.health as HealthMap;
    const rollout = deployment.rollout as Record<string, number>;
    const byRegion: DeploymentMetricsSummary["byRegion"] = {};

    for (const region of deployment.regions as string[]) {
      const regionMetrics = series.filter((entry) => entry.region === region);
      const latest = regionMetrics[0];
      byRegion[region] = {
        requests: regionMetrics.reduce((sum, m) => sum + m.requests, 0),
        avgLatencyMs: latest
          ? regionMetrics.reduce((sum, m) => sum + m.latencyMs, 0) / regionMetrics.length
          : 0,
        errorRate: latest?.errorRate ?? 0,
        tokenThroughput: latest?.tokenThroughput ?? 0,
        rolloutPercent: rollout[region] ?? 0,
        canaryStable: latest?.canaryStable ?? true,
        health: health[region] ?? "HEALTHY",
      };
    }

    return {
      modelId,
      version: deployment.version,
      byRegion,
      series,
      failoverActive: Boolean(deployment.failoverRegion),
      failoverRegion: deployment.failoverRegion,
    };
  }
}
