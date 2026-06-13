export type FeatureFlagType = "BOOLEAN" | "PERCENTAGE" | "VARIANT";

export type FlagVariant = {
  key: string;
  weight?: number;
  value?: unknown;
  modelId?: string;
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

export type FlagEvaluationContext = {
  userId?: string;
  tenantId: string;
  attributes?: Record<string, unknown>;
};

export type FlagEvaluationResult = {
  key: string;
  enabled: boolean;
  variant?: string;
  value?: unknown;
};

export function toFeatureFlagRecord(row: {
  id: string;
  tenantId: string;
  key: string;
  type: string;
  variants: unknown;
  rollout: unknown;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): FeatureFlagRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    key: row.key,
    type: row.type as FeatureFlagType,
    variants: Array.isArray(row.variants) ? (row.variants as FlagVariant[]) : [],
    rollout: (row.rollout as Record<string, unknown>) ?? {},
    isActive: row.isActive,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function hashBucket(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 100;
}
