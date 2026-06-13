export type FeatureFlagType = "BOOLEAN" | "PERCENTAGE" | "VARIANT";

export type FlagVariant = {
  key: string;
  weight?: number;
  value?: unknown;
  modelId?: string;
  uiComponent?: string;
};

export type FeatureFlagRecord = {
  id: string;
  tenantId: string;
  key: string;
  type: FeatureFlagType;
  variants: FlagVariant[];
  rollout: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FlagEvaluationResult = {
  key: string;
  enabled: boolean;
  variant?: string;
  value?: unknown;
};

export type ExperimentStatus = "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED";

export type ExperimentVariant = {
  key: string;
  weight: number;
  modelId?: string;
  uiComponent?: string;
  value?: unknown;
};

export type AbExperimentRecord = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  variants: ExperimentVariant[];
  targetAudience: Record<string, unknown>;
  status: ExperimentStatus;
  metricsTracked: string[];
  experimentType: string;
  modelKey: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ExperimentReport = {
  experimentId: string;
  experimentName: string;
  status: string;
  variants: Array<{
    variant: string;
    assignments: number;
    conversions: number;
    conversionRate: number;
    engagements: number;
    engagementRate: number;
    retention: number;
    avgLatencyMs: number;
    errorRate: number;
  }>;
  winner: string | null;
  statisticalSignificance: number;
  recommendation: string;
};
