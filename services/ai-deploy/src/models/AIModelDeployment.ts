export const DEPLOYMENT_REGIONS = ["eu-west-1", "us-east-1", "ap-southeast-1"] as const;

export type DeploymentRegion = (typeof DEPLOYMENT_REGIONS)[number];

export type RegionHealth = "HEALTHY" | "DEGRADED" | "UNHEALTHY";

export type DeploymentStatus = "DEPLOYING" | "ACTIVE" | "FAILED" | "ROLLED_BACK";

export type RolloutMap = Record<string, number>;

export type HealthMap = Record<string, RegionHealth>;

export type PipelineStep = {
  name: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  startedAt?: string;
  finishedAt?: string;
  message?: string;
};

export type AIModelDeploymentRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  version: string;
  regions: string[];
  rollout: RolloutMap;
  health: HealthMap;
  status: DeploymentStatus;
  artifactLocation: string;
  previousDeploymentId: string | null;
  pipeline: PipelineStep[];
  failoverRegion: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeploymentMetricRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  version: string;
  region: string;
  timestamp: string;
  requests: number;
  latencyMs: number;
  errorRate: number;
  tokenThroughput: number;
  memoryUsageMb: number;
  cpuLoad: number;
  rolloutPercent: number;
  canaryStable: boolean;
};

export type DeploymentMetricsSummary = {
  modelId: string;
  version: string;
  byRegion: Record<
    string,
    {
      requests: number;
      avgLatencyMs: number;
      errorRate: number;
      tokenThroughput: number;
      rolloutPercent: number;
      canaryStable: boolean;
      health: RegionHealth;
    }
  >;
  series: DeploymentMetricRecord[];
  failoverActive: boolean;
  failoverRegion: string | null;
};

export type StartDeploymentInput = {
  modelId: string;
  version: string;
  regions?: string[];
  rollout?: RolloutMap;
};

export type ArtifactManifest = {
  modelId: string;
  version: string;
  packagedAt: string;
  artifacts: {
    weights: string;
    tokenizer: string;
    config: string;
    metadata: Record<string, unknown>;
    safetyRules: Record<string, unknown>;
  };
  checksum: string;
};

export function toDeploymentRecord(row: {
  id: string;
  tenantId: string;
  modelId: string;
  version: string;
  regions: unknown;
  rollout: unknown;
  health: unknown;
  status: string;
  artifactLocation: string;
  previousDeploymentId: string | null;
  pipeline: unknown;
  failoverRegion: string | null;
  createdAt: Date;
  updatedAt: Date;
}): AIModelDeploymentRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    modelId: row.modelId,
    version: row.version,
    regions: Array.isArray(row.regions) ? (row.regions as string[]) : [],
    rollout: (row.rollout as RolloutMap) ?? {},
    health: (row.health as HealthMap) ?? {},
    status: row.status as DeploymentStatus,
    artifactLocation: row.artifactLocation,
    previousDeploymentId: row.previousDeploymentId,
    pipeline: Array.isArray(row.pipeline) ? (row.pipeline as PipelineStep[]) : [],
    failoverRegion: row.failoverRegion,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toMetricRecord(row: {
  id: string;
  tenantId: string;
  modelId: string;
  version: string;
  region: string;
  timestamp: Date;
  requests: number;
  latencyMs: number;
  errorRate: number;
  tokenThroughput: number;
  memoryUsageMb: number;
  cpuLoad: number;
  rolloutPercent: number;
  canaryStable: boolean;
}): DeploymentMetricRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    modelId: row.modelId,
    version: row.version,
    region: row.region,
    timestamp: row.timestamp.toISOString(),
    requests: row.requests,
    latencyMs: row.latencyMs,
    errorRate: row.errorRate,
    tokenThroughput: row.tokenThroughput,
    memoryUsageMb: row.memoryUsageMb,
    cpuLoad: row.cpuLoad,
    rolloutPercent: row.rolloutPercent,
    canaryStable: row.canaryStable,
  };
}

export function defaultRollout(regions: string[]): RolloutMap {
  return regions.reduce<RolloutMap>((acc, region, index) => {
    acc[region] = index === 0 ? 100 : 0;
    return acc;
  }, {});
}

export function defaultHealth(regions: string[]): HealthMap {
  return regions.reduce<HealthMap>((acc, region) => {
    acc[region] = "HEALTHY";
    return acc;
  }, {});
}
