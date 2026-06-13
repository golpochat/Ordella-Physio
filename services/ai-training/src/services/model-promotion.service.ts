import { Injectable, Logger } from "@nestjs/common";
import { toModelPromotionRecord } from "@/models/AIModelPromotion";
import type { CanaryHistoryPoint } from "@/models/AIModelPromotion";
import { AiInferenceRoutingClient } from "@/integrations/ai-inference-routing.client";
import {
  AiModelPromotionRepository,
  AiModelRegistryRepository,
} from "@/repositories/ai-training.repository";
import { modelNotFoundError } from "@/utils/training-errors";

@Injectable()
export class ModelPromotionService {
  private readonly logger = new Logger(ModelPromotionService.name);

  constructor(
    private readonly promotionRepository: AiModelPromotionRepository,
    private readonly registryRepository: AiModelRegistryRepository,
    private readonly inferenceRoutingClient: AiInferenceRoutingClient,
  ) {}

  async promoteToStaging(tenantId: string, modelId: string, userId: string) {
    const model = await this.requireModel(tenantId, modelId);
    const promotion = await this.promotionRepository.upsertByModelId(
      tenantId,
      modelId,
      {
        tenantId,
        modelId,
        stage: "STAGING",
        rolloutPercentage: 0,
        promotedByUserId: userId,
      },
      {
        stage: "STAGING",
        rolloutPercentage: 0,
        promotedByUserId: userId,
      },
    );

    await this.inferenceRoutingClient.syncRouting({
      tenantId,
      modelId,
      modelName: model.modelName,
      version: model.version,
      stage: "STAGING",
      rolloutPercentage: 0,
      fileLocation: model.fileLocation,
    });

    return toModelPromotionRecord(promotion);
  }

  async promoteToProduction(tenantId: string, modelId: string, userId: string) {
    const model = await this.requireModel(tenantId, modelId);
    await this.registryRepository.update(tenantId, modelId, { status: "PUBLISHED" });

    const promotion = await this.promotionRepository.upsertByModelId(
      tenantId,
      modelId,
      {
        tenantId,
        modelId,
        stage: "PRODUCTION",
        rolloutPercentage: 10,
        promotedByUserId: userId,
      },
      {
        stage: "PRODUCTION",
        rolloutPercentage: 10,
        promotedByUserId: userId,
      },
    );

    const history = this.appendCanaryPoint(promotion.canaryHistory, {
      rolloutPercentage: 10,
      errorRate: 0.01,
      latencyMs: 240,
      safetyScore: 0.92,
    });
    await this.promotionRepository.update(tenantId, modelId, { canaryHistory: history as never });

    await this.inferenceRoutingClient.syncRouting({
      tenantId,
      modelId,
      modelName: model.modelName,
      version: model.version,
      stage: "PRODUCTION",
      rolloutPercentage: 10,
      fileLocation: model.fileLocation,
    });

    const updated = await this.promotionRepository.findByModelId(tenantId, modelId);
    return toModelPromotionRecord(updated!);
  }

  async deprecateModel(tenantId: string, modelId: string, userId: string) {
    const model = await this.requireModel(tenantId, modelId);
    await this.registryRepository.update(tenantId, modelId, { status: "DEPRECATED" });

    const promotion = await this.promotionRepository.upsertByModelId(
      tenantId,
      modelId,
      {
        tenantId,
        modelId,
        stage: "DEPRECATED",
        rolloutPercentage: 0,
        promotedByUserId: userId,
      },
      {
        stage: "DEPRECATED",
        rolloutPercentage: 0,
        promotedByUserId: userId,
      },
    );

    await this.inferenceRoutingClient.syncRouting({
      tenantId,
      modelId,
      modelName: model.modelName,
      version: model.version,
      stage: "DEPRECATED",
      rolloutPercentage: 0,
      fileLocation: model.fileLocation,
    });

    return toModelPromotionRecord(promotion);
  }

  async setRolloutPercentage(tenantId: string, modelId: string, percentage: number, userId: string) {
    const model = await this.requireModel(tenantId, modelId);
    const clamped = Math.max(0, Math.min(100, Math.round(percentage)));

    const promotion = await this.promotionRepository.upsertByModelId(
      tenantId,
      modelId,
      {
        tenantId,
        modelId,
        stage: "PRODUCTION",
        rolloutPercentage: clamped,
        promotedByUserId: userId,
      },
      {
        rolloutPercentage: clamped,
        promotedByUserId: userId,
      },
    );

    const history = this.appendCanaryPoint(promotion.canaryHistory, {
      rolloutPercentage: clamped,
      errorRate: 0.008 + (100 - clamped) / 10000,
      latencyMs: 220 + (100 - clamped),
      safetyScore: 0.9,
    });
    await this.promotionRepository.update(tenantId, modelId, { canaryHistory: history as never });

    await this.inferenceRoutingClient.syncRouting({
      tenantId,
      modelId,
      modelName: model.modelName,
      version: model.version,
      stage: promotion.stage as "STAGING" | "PRODUCTION" | "DEPRECATED",
      rolloutPercentage: clamped,
      fileLocation: model.fileLocation,
    });

    const updated = await this.promotionRepository.findByModelId(tenantId, modelId);
    return toModelPromotionRecord(updated!);
  }

  async getPromotion(tenantId: string, modelId: string) {
    await this.requireModel(tenantId, modelId);
    const promotion = await this.promotionRepository.findByModelId(tenantId, modelId);
    if (!promotion) {
      return null;
    }
    return toModelPromotionRecord(promotion);
  }

  async getActiveModelForTenant(tenantId: string) {
    const promotion = await this.promotionRepository.findProductionByTenant(tenantId);
    if (!promotion) {
      return null;
    }
    const model = await this.registryRepository.findById(tenantId, promotion.modelId);
    if (!model) {
      return null;
    }
    return {
      modelId: model.id,
      modelName: model.modelName,
      version: model.version,
      rolloutPercentage: promotion.rolloutPercentage,
      stage: promotion.stage,
    };
  }

  private async requireModel(tenantId: string, modelId: string) {
    const model = await this.registryRepository.findById(tenantId, modelId);
    if (!model) {
      throw modelNotFoundError();
    }
    return model;
  }

  private appendCanaryPoint(
    current: unknown,
    point: Omit<CanaryHistoryPoint, "timestamp">,
  ): CanaryHistoryPoint[] {
    const history = Array.isArray(current) ? (current as CanaryHistoryPoint[]) : [];
    return [
      ...history,
      {
        timestamp: new Date().toISOString(),
        ...point,
      },
    ];
  }
}
