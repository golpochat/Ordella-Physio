import { Injectable, Logger } from "@nestjs/common";
import { deployConfig } from "@/config/deploy.config";
import type { HealthMap, PipelineStep, RegionHealth } from "@/models/AIModelDeployment";
import { DeploymentRepository } from "@/repositories/deployment.repository";

export type RegionHealthSnapshot = {
  region: string;
  latencyMs: number;
  errorRate: number;
  tokenThroughput: number;
  memoryUsageMb: number;
  cpuLoad: number;
  health: RegionHealth;
};

@Injectable()
export class DeploymentHealthService {
  private readonly logger = new Logger(DeploymentHealthService.name);

  constructor(private readonly repository: DeploymentRepository) {}

  async runHealthCheck(tenantId: string, modelId: string, version: string, region: string) {
    const deployment = await this.repository.findByModelVersion(tenantId, modelId, version);
    if (!deployment) {
      throw new Error("Deployment not found.");
    }

    const rollout = (deployment.rollout as Record<string, number>)?.[region] ?? 0;
    const snapshot = this.simulateHealth(region, rollout);
    const health = { ...(deployment.health as HealthMap), [region]: snapshot.health };

    await this.repository.update(deployment.id, { health });
    await this.repository.recordMetric({
      tenantId,
      modelId,
      version,
      region,
      latencyMs: snapshot.latencyMs,
      errorRate: snapshot.errorRate,
      tokenThroughput: snapshot.tokenThroughput,
      memoryUsageMb: snapshot.memoryUsageMb,
      cpuLoad: snapshot.cpuLoad,
      rolloutPercent: rollout,
      canaryStable: snapshot.errorRate < 0.05,
    });

    if (snapshot.health === "UNHEALTHY") {
      await this.triggerFailover(tenantId, modelId, version, region);
    }

    void this.recordObservability(tenantId, {
      modelId,
      region,
      snapshot,
      version,
    });

    return snapshot;
  }

  private async recordObservability(
    tenantId: string,
    input: {
      modelId: string;
      region: string;
      version: string;
      snapshot: RegionHealthSnapshot;
    },
  ) {
    const observabilityUrl = process.env.AI_OBSERVABILITY_SERVICE_URL ?? "http://localhost:3083";
    try {
      await fetch(`${observabilityUrl}/ai/observability/internal/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId,
          "x-internal-service": "ai-deploy",
        },
        body: JSON.stringify({
          trace: {
            service: "deployment",
            operation: "deployment.health_check",
            durationMs: input.snapshot.latencyMs,
            status: input.snapshot.health === "UNHEALTHY" ? "ERROR" : "OK",
            metadata: { modelId: input.modelId, region: input.region, version: input.version },
          },
          log: {
            level: input.snapshot.health === "UNHEALTHY" ? "WARN" : "INFO",
            service: "deployment",
            message: `Health check ${input.snapshot.health} for ${input.modelId} in ${input.region}`,
            metadata: input.snapshot,
          },
          metrics: [
            { modelId: input.modelId, region: input.region, metricType: "latency", value: input.snapshot.latencyMs },
            { modelId: input.modelId, region: input.region, metricType: "error_rate", value: input.snapshot.errorRate },
            { modelId: input.modelId, region: input.region, metricType: "throughput", value: input.snapshot.tokenThroughput },
          ],
        }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Observability record failed";
      this.logger.debug(`Deployment observability unavailable: ${message}`);
    }
  }

  async markRegionHealthy(tenantId: string, modelId: string, version: string, region: string) {
    return this.setRegionHealth(tenantId, modelId, version, region, "HEALTHY");
  }

  async markRegionUnhealthy(tenantId: string, modelId: string, version: string, region: string) {
    await this.setRegionHealth(tenantId, modelId, version, region, "UNHEALTHY");
    return this.triggerFailover(tenantId, modelId, version, region);
  }

  async triggerFailover(tenantId: string, modelId: string, version: string, failedRegion: string) {
    const deployment = await this.repository.findByModelVersion(tenantId, modelId, version);
    if (!deployment) {
      return { failover: false };
    }

    const regions = deployment.regions as string[];
    const health = deployment.health as HealthMap;
    const fallback = regions.find((region) => region !== failedRegion && health[region] !== "UNHEALTHY");

    if (!fallback) {
      this.logger.warn(`No failover target for ${modelId}@${version} after ${failedRegion} failure.`);
      return { failover: false, reason: "NO_HEALTHY_REGION" };
    }

    await this.repository.update(deployment.id, { failoverRegion: fallback });
    this.logger.warn(`Failover triggered: ${modelId}@${version} ${failedRegion} → ${fallback}`);
    return { failover: true, from: failedRegion, to: fallback };
  }

  private async setRegionHealth(
    tenantId: string,
    modelId: string,
    version: string,
    region: string,
    status: RegionHealth,
  ) {
    const deployment = await this.repository.findByModelVersion(tenantId, modelId, version);
    if (!deployment) {
      throw new Error("Deployment not found.");
    }
    const health = { ...(deployment.health as HealthMap), [region]: status };
    await this.repository.update(deployment.id, { health });
    return health;
  }

  private simulateHealth(region: string, rollout: number): RegionHealthSnapshot {
    const baseLatency: Record<string, number> = {
      "eu-west-1": 45,
      "us-east-1": 32,
      "ap-southeast-1": 78,
    };
    const jitter = Math.random() * 20;
    const latencyMs = (baseLatency[region] ?? 60) + jitter;
    const errorRate = rollout > 0 && rollout < 100 ? 0.02 + Math.random() * 0.03 : Math.random() * 0.02;
    const health: RegionHealth =
      errorRate > 0.08 ? "UNHEALTHY" : errorRate > 0.04 ? "DEGRADED" : "HEALTHY";

    return {
      region,
      latencyMs: Math.round(latencyMs),
      errorRate: Number(errorRate.toFixed(4)),
      tokenThroughput: Math.round(800 + Math.random() * 400),
      memoryUsageMb: Math.round(1200 + Math.random() * 300),
      cpuLoad: Number((0.3 + Math.random() * 0.4).toFixed(2)),
      health,
    };
  }

  getRegionLatencyMap() {
    return deployConfig.defaultRegions.reduce<Record<string, number>>((acc, region) => {
      acc[region] = region === "us-east-1" ? 32 : region === "eu-west-1" ? 45 : 78;
      return acc;
    }, {});
  }
}
