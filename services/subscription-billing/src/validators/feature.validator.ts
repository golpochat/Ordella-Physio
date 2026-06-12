import { subscriptionValidationError } from "@/utils/subscription-errors";

const FEATURE_KEYS = [
  "REPORTING",
  "AI_ASSISTANT",
  "ADVANCED_ANALYTICS",
  "BILLING",
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];

export function validateFeatureKey(value: string): FeatureKey {
  const featureKey = value.trim().toUpperCase() as FeatureKey;
  if (!FEATURE_KEYS.includes(featureKey)) {
    throw subscriptionValidationError([{ field: "featureKey", message: "Invalid feature key." }]);
  }
  return featureKey;
}
