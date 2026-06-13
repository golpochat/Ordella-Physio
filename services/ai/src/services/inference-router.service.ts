import { Injectable, Logger } from "@nestjs/common";

export type RegionRouteConfig = {
  region: string;
  endpoint: string;
  rolloutPercent: number;
  health: "HEALTHY" | "DEGRADED" | "UNHEALTHY";
};

export type MultiRegionRoutingConfig = {
  tenantId: string;
  modelId: string;
  modelName: string;
  version: string;
  artifactLocation: string;
  routes: RegionRouteConfig[];
};

export type InferenceRouteResult = {
  modelId: string;
  modelName: string;
  version: string;
  region: string;
  endpoint: string;
  mode: "FULL" | "CANARY" | "FAILOVER" | "EXPERIMENT";
  rolloutPercent: number;
  artifactLocation: string;
  experimentId?: string;
  experimentVariant?: string;
};

export type ModelExperimentVariant = {
  key: string;
  weight: number;
  modelId?: string;
};

export type ModelExperimentConfig = {
  tenantId: string;
  experimentId: string;
  modelKey: string;
  variants: ModelExperimentVariant[];
  status: "RUNNING" | "PAUSED" | "COMPLETED" | "DRAFT";
};

export type ExperimentRouteResult = {
  experimentId: string;
  modelKey: string;
  variant: string;
  modelId?: string;
  mode: "EXPERIMENT";
};

export type GatewayRoutingContext = {
  gatewayKeyId: string;
  source: "ai-gateway";
  scopes?: string[];
};

@Injectable()
export class InferenceRouterService {
  private readonly logger = new Logger(InferenceRouterService.name);
  private readonly routingTable = new Map<string, MultiRegionRoutingConfig>();
  private readonly experimentTable = new Map<string, ModelExperimentConfig>();
  private readonly gatewayRequests = new Map<string, { count: number; lastAt: string }>();

  syncModelExperiment(config: ModelExperimentConfig) {
    const key = `${config.tenantId}:${config.modelKey}`;
    if (config.status === "RUNNING") {
      this.experimentTable.set(key, config);
      this.logger.log(`Synced model experiment ${config.experimentId} for ${config.modelKey}`);
    } else {
      this.experimentTable.delete(key);
    }
    return { synced: true, experimentId: config.experimentId };
  }

  getModelExperiment(tenantId: string, modelKey: string) {
    return this.experimentTable.get(`${tenantId}:${modelKey}`) ?? null;
  }

  routeWithExperiment(tenantId: string, modelKey: string, userId?: string): ExperimentRouteResult | null {
    const experiment = this.getModelExperiment(tenantId, modelKey);
    if (!experiment || experiment.status !== "RUNNING") return null;

    const bucket = this.hashBucket(`${tenantId}:${userId ?? "anon"}:${experiment.experimentId}`);
    const total = experiment.variants.reduce((sum, v) => sum + v.weight, 0) || 100;
    let cursor = 0;
    let selected = experiment.variants[0];
    for (const variant of experiment.variants) {
      cursor += (variant.weight / total) * 100;
      if (bucket < cursor) {
        selected = variant;
        break;
      }
    }

    return {
      experimentId: experiment.experimentId,
      modelKey,
      variant: selected?.key ?? "A",
      modelId: selected?.modelId,
      mode: "EXPERIMENT",
    };
  }

  logExperimentEvent(experimentId: string, variant: string, eventType: string) {
    this.logger.debug(`Experiment event: ${experimentId} ${variant} ${eventType}`);
    return { logged: true };
  }

  recordGatewayRequest(tenantId: string, context: GatewayRoutingContext, modelId: string) {
    const key = `${tenantId}:${context.gatewayKeyId}`;
    const current = this.gatewayRequests.get(key) ?? { count: 0, lastAt: new Date().toISOString() };
    this.gatewayRequests.set(key, {
      count: current.count + 1,
      lastAt: new Date().toISOString(),
    });
    this.logger.debug(`Gateway request via ${context.gatewayKeyId} for model ${modelId}`);
    return { routed: true, tenantId, modelId, gatewayKeyId: context.gatewayKeyId, requestCount: current.count + 1 };
  }

  getGatewayUsage(tenantId: string) {
    return [...this.gatewayRequests.entries()]
      .filter(([key]) => key.startsWith(`${tenantId}:`))
      .map(([key, stats]) => ({
        gatewayKeyId: key.split(":")[1] ?? key,
        ...stats,
      }));
  }

  private readonly securityAuditQueue: Array<{
    tenantId: string;
    userId?: string;
    modelId?: string;
    action: string;
    metadata: Record<string, unknown>;
  }> = [];

  recordSecurityAudit(tenantId: string, input: {
    userId?: string;
    modelId?: string;
    action: "INFERENCE" | "MODEL_ACCESS";
    metadata?: Record<string, unknown>;
    piiDetected?: boolean;
  }) {
    this.securityAuditQueue.push({
      tenantId,
      userId: input.userId,
      modelId: input.modelId,
      action: input.action,
      metadata: { ...input.metadata, piiDetected: input.piiDetected ?? false, queuedAt: new Date().toISOString() },
    });
    this.logger.debug(`Security audit queued: ${input.action} for ${input.modelId ?? "unknown"}`);
    return { queued: true, queueSize: this.securityAuditQueue.length };
  }

  getSecurityAuditQueue(tenantId: string) {
    return this.securityAuditQueue.filter((entry) => entry.tenantId === tenantId);
  }

  syncRouting(config: MultiRegionRoutingConfig) {
    const key = this.routingKey(config.tenantId, config.modelId);
    this.routingTable.set(key, config);
    this.logger.log(`Synced multi-region routing for ${config.modelName}@${config.version}`);
    return { synced: true, regions: config.routes.length };
  }

  getRouting(tenantId: string, modelId: string) {
    return this.routingTable.get(this.routingKey(tenantId, modelId)) ?? null;
  }

  listActiveRoutes(tenantId: string) {
    return [...this.routingTable.values()].filter((entry) => entry.tenantId === tenantId);
  }

  routeInference(tenantId: string, modelNameOrId: string, tenantRegion?: string, userId?: string): InferenceRouteResult | null {
    const experimentRoute = this.routeWithExperiment(tenantId, modelNameOrId, userId);
    if (experimentRoute?.modelId) {
      const baseRoute = this.routeInferenceInternal(tenantId, experimentRoute.modelId, tenantRegion);
      if (baseRoute) {
        return {
          ...baseRoute,
          mode: "EXPERIMENT",
          experimentId: experimentRoute.experimentId,
          experimentVariant: experimentRoute.variant,
        };
      }
    }

    return this.routeInferenceInternal(tenantId, modelNameOrId, tenantRegion);
  }

  private routeInferenceInternal(tenantId: string, modelNameOrId: string, tenantRegion?: string): InferenceRouteResult | null {
    const config =
      this.routingTable.get(this.routingKey(tenantId, modelNameOrId)) ??
      [...this.routingTable.values()].find(
        (entry) => entry.tenantId === tenantId && entry.modelName === modelNameOrId,
      );

    if (!config) {
      return null;
    }

    const healthyRoutes = config.routes.filter(
      (route) => route.health !== "UNHEALTHY" && route.rolloutPercent > 0,
    );
    if (!healthyRoutes.length) {
      return null;
    }

    const preferred = tenantRegion
      ? healthyRoutes.find((route) => route.region === tenantRegion)
      : undefined;
    const selected = preferred ?? this.weightedSelect(healthyRoutes, config.modelId, config.version);
    const mode = selected.rolloutPercent < 100 ? "CANARY" : "FULL";

    return {
      modelId: config.modelId,
      modelName: config.modelName,
      version: config.version,
      region: selected.region,
      endpoint: selected.endpoint,
      mode,
      rolloutPercent: selected.rolloutPercent,
      artifactLocation: config.artifactLocation,
    };
  }

  applyFailover(tenantId: string, modelId: string, failedRegion: string) {
    const config = this.routingTable.get(this.routingKey(tenantId, modelId));
    if (!config) return null;

    const fallback = config.routes.find(
      (route) => route.region !== failedRegion && route.health !== "UNHEALTHY",
    );
    if (!fallback) return null;

    const updated: MultiRegionRoutingConfig = {
      ...config,
      routes: config.routes.map((route) =>
        route.region === failedRegion ? { ...route, health: "UNHEALTHY" } : route,
      ),
    };
    this.routingTable.set(this.routingKey(tenantId, modelId), updated);

    return {
      modelId,
      region: fallback.region,
      endpoint: fallback.endpoint,
      mode: "FAILOVER" as const,
      rolloutPercent: fallback.rolloutPercent,
      artifactLocation: config.artifactLocation,
    };
  }

  private weightedSelect(routes: RegionRouteConfig[], modelId: string, version: string) {
    const total = routes.reduce((sum, route) => sum + route.rolloutPercent, 0);
    const roll = Math.random() * Math.max(total, 1);
    let cursor = 0;
    for (const route of routes) {
      cursor += route.rolloutPercent;
      if (roll <= cursor) {
        return route;
      }
    }
    return routes[0] ?? { region: "eu-west-1", endpoint: `local://${modelId}/${version}`, rolloutPercent: 100, health: "HEALTHY" as const };
  }

  private routingKey(tenantId: string, modelId: string) {
    return `${tenantId}:${modelId}`;
  }

  private hashBucket(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 100;
  }
}
