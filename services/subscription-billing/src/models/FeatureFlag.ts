import type { FeatureFlag as FeatureFlagModel } from "@/generated/prisma";

export type { FeatureFlagModel as FeatureFlagRecord };

export type FeatureFlagResponse = {
  featureKey: string;
  enabled: boolean;
};

export function toFeatureFlagResponse(record: FeatureFlagModel): FeatureFlagResponse {
  return {
    featureKey: record.featureKey,
    enabled: record.enabled,
  };
}
