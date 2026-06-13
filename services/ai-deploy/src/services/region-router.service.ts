import { Injectable, Logger } from "@nestjs/common";
import { deployConfig } from "@/config/deploy.config";
import type { HealthMap, RolloutMap } from "@/models/AIModelDeployment";
import { DeploymentRepository } from "@/repositories/deployment.repository";

const TENANT_REGION_MAP: Record<string, string> = {
  default: "eu-west-1",
  eu: "eu-west-1",
  us: "us-east-1",
  apac: "ap-southeast-1",
};

@Injectable()
export class RegionRouterService {
  private readonly logger = new Logger(RegionRouterService.name);

  constructor(private readonly repository: DeploymentRepository) {}

  getBestRegionForTenant(tenantId: string, tenantRegion?: string) {
    const preferred = tenantRegion ?? TENANT_REGION_MAP[tenantId] ?? TENANT_REGION_MAP.default;
    const latencyMap = this.getRegionLatencyMap();
    const sorted = [...deployConfig.defaultRegions].sort(
      (a, b) => (latencyMap[a] ?? 999) - (latencyMap[b] ?? 999),
    );
    const best = sorted.includes(preferred as (typeof deployConfig.defaultRegions)[number])
      ? preferred
      : sorted[0];
    return { preferred, best, latencyMap };
  }

  getRegionLatencyMap(): Record<string, number> {
    return {
      "eu-west-1": 45,
      "us-east-1": 32,
      "ap-southeast-1": 78,
    };
  }

  async routeInference(
    tenantId: string,
    modelId: string,
    version: string,
    tenantRegion?: string,
  ) {
    const deployment = await this.repository.findByModelVersion(tenantId, modelId, version);
    if (!deployment) {
      const active = await this.repository.getActive(tenantId, modelId);
      if (!active) {
        throw new Error("No active deployment for model.");
      }
      return this.selectRegion(active.regions, active.rollout, active.health, active.failoverRegion, tenantRegion);
    }

    return this.selectRegion(
      deployment.regions as string[],
      deployment.rollout as RolloutMap,
      deployment.health as HealthMap,
      deployment.failoverRegion,
      tenantRegion,
    );
  }

  async applyRolloutWeights(tenantId: string, modelId: string, version: string) {
    const deployment = await this.repository.findByModelVersion(tenantId, modelId, version);
    if (!deployment) {
      throw new Error("Deployment not found.");
    }

    const rollout = deployment.rollout as RolloutMap;
    const health = deployment.health as HealthMap;
    const routes = (deployment.regions as string[]).map((region) => ({
      region,
      rolloutPercent: rollout[region] ?? 0,
      health: health[region] ?? "HEALTHY",
      endpoint: this.regionEndpoint(modelId, version, region),
      weight: this.computeWeight(rollout[region] ?? 0, health[region] ?? "HEALTHY"),
    }));

    return { modelId, version, routes, totalWeight: routes.reduce((sum, r) => sum + r.weight, 0) };
  }

  private selectRegion(
    regions: string[],
    rollout: RolloutMap,
    health: HealthMap,
    failoverRegion: string | null,
    tenantRegion?: string,
  ) {
    if (failoverRegion && health[failoverRegion] !== "UNHEALTHY") {
      return {
        region: failoverRegion,
        endpoint: this.regionEndpoint("model", "v", failoverRegion),
        mode: "FAILOVER" as const,
        rolloutPercent: rollout[failoverRegion] ?? 100,
      };
    }

    const candidates = regions
      .filter((region) => health[region] !== "UNHEALTHY" && (rollout[region] ?? 0) > 0)
      .map((region) => ({
        region,
        weight: this.computeWeight(rollout[region] ?? 0, health[region] ?? "HEALTHY"),
        latency: this.getRegionLatencyMap()[region] ?? 100,
      }))
      .sort((a, b) => {
        if (tenantRegion && a.region === tenantRegion) return -1;
        if (tenantRegion && b.region === tenantRegion) return 1;
        return a.latency - b.latency || b.weight - a.weight;
      });

    const selected = candidates[0];
    if (!selected) {
      throw new Error("No healthy region available for inference.");
    }

    const mode = (rollout[selected.region] ?? 0) < 100 ? ("CANARY" as const) : ("FULL" as const);
    return {
      region: selected.region,
      endpoint: this.regionEndpoint("model", "v", selected.region),
      mode,
      rolloutPercent: rollout[selected.region] ?? 0,
      candidates,
    };
  }

  private computeWeight(rolloutPercent: number, health: string) {
    const healthMultiplier = health === "HEALTHY" ? 1 : health === "DEGRADED" ? 0.5 : 0;
    return rolloutPercent * healthMultiplier;
  }

  regionEndpoint(modelId: string, version: string, region: string) {
    return `https://${region}.inference.ordella.ai/models/${modelId}/versions/${version}`;
  }

  weightedRoute(modelId: string, version: string, rollout: RolloutMap, health: HealthMap) {
    const total = Object.entries(rollout).reduce((sum, [region, pct]) => {
      if (health[region] === "UNHEALTHY") return sum;
      return sum + pct;
    }, 0);
    const roll = Math.random() * Math.max(total, 1);
    let cursor = 0;
    for (const [region, pct] of Object.entries(rollout)) {
      if (health[region] === "UNHEALTHY" || pct <= 0) continue;
      cursor += pct;
      if (roll <= cursor) {
        return { region, endpoint: this.regionEndpoint(modelId, version, region), rolloutPercent: pct };
      }
    }
    const fallback = Object.keys(rollout).find((r) => health[r] !== "UNHEALTHY");
    if (!fallback) throw new Error("No routable region.");
    return {
      region: fallback,
      endpoint: this.regionEndpoint(modelId, version, fallback),
      rolloutPercent: rollout[fallback] ?? 0,
    };
  }
}
