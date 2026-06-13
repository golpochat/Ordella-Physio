import type { AIModelPromotion } from "@/generated/prisma";

export type PromotionStage = "STAGING" | "PRODUCTION" | "DEPRECATED";

export type CanaryHistoryPoint = {
  timestamp: string;
  rolloutPercentage: number;
  errorRate: number;
  latencyMs: number;
  safetyScore: number;
};

export type ModelPromotionRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  stage: PromotionStage;
  rolloutPercentage: number;
  canaryHistory: CanaryHistoryPoint[];
  promotedByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export function toModelPromotionRecord(promotion: AIModelPromotion): ModelPromotionRecord {
  const canaryHistory = Array.isArray(promotion.canaryHistory)
    ? (promotion.canaryHistory as CanaryHistoryPoint[])
    : [];

  return {
    id: promotion.id,
    tenantId: promotion.tenantId,
    modelId: promotion.modelId,
    stage: promotion.stage as PromotionStage,
    rolloutPercentage: promotion.rolloutPercentage,
    canaryHistory,
    promotedByUserId: promotion.promotedByUserId,
    createdAt: promotion.createdAt.toISOString(),
    updatedAt: promotion.updatedAt.toISOString(),
  };
}
