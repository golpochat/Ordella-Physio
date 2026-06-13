import { Injectable, Logger } from "@nestjs/common";
import { ModelPromotionService } from "@/services/model-promotion.service";
import { TrainingNotificationService } from "@/services/training-notification.service";

@Injectable()
export class CanaryRolloutService {
  private readonly logger = new Logger(CanaryRolloutService.name);

  constructor(
    private readonly promotionService: ModelPromotionService,
    private readonly notificationService: TrainingNotificationService,
  ) {}

  async startCanary(tenantId: string, modelId: string, userId: string) {
    const promotion = await this.promotionService.promoteToProduction(tenantId, modelId, userId);
    this.notificationService.notifyMilestone({
      tenantId,
      trainingJobId: modelId,
      milestone: "JOB_STARTED",
      message: `Canary rollout started at ${promotion.rolloutPercentage}%`,
      metadata: { modelId, rolloutPercentage: promotion.rolloutPercentage },
    });
    return promotion;
  }

  async monitorCanary(tenantId: string, modelId: string) {
    const promotion = await this.promotionService.getPromotion(tenantId, modelId);
    if (!promotion) {
      return {
        modelId,
        stage: "STAGING" as const,
        rolloutPercentage: 0,
        canaryHistory: [],
        latestMetrics: null,
        healthy: true,
      };
    }
    const latest = promotion.canaryHistory.at(-1);
    return {
      modelId,
      stage: promotion.stage,
      rolloutPercentage: promotion.rolloutPercentage,
      canaryHistory: promotion.canaryHistory,
      latestMetrics: latest ?? null,
      healthy: latest ? latest.errorRate < 0.03 && latest.safetyScore > 0.85 : true,
    };
  }

  async autoAdjustRollout(tenantId: string, modelId: string, userId: string) {
    const monitor = await this.monitorCanary(tenantId, modelId);
    if (!monitor.rolloutPercentage && !monitor.canaryHistory.length) {
      return null;
    }
    if (!monitor.healthy) {
      return this.rollbackIfIssues(tenantId, modelId, userId);
    }

    let next = monitor.rolloutPercentage;
    if (monitor.latestMetrics && monitor.latestMetrics.errorRate < 0.015) {
      next = Math.min(100, monitor.rolloutPercentage + 15);
    } else if (monitor.latestMetrics && monitor.latestMetrics.errorRate < 0.025) {
      next = Math.min(100, monitor.rolloutPercentage + 5);
    }

    if (next === monitor.rolloutPercentage) {
      const current = await this.promotionService.getPromotion(tenantId, modelId);
      return current;
    }

    this.logger.log(`Auto-adjusting canary rollout for ${modelId}: ${monitor.rolloutPercentage}% -> ${next}%`);
    return this.promotionService.setRolloutPercentage(tenantId, modelId, next, userId);
  }

  async rollbackIfIssues(tenantId: string, modelId: string, userId: string) {
    const promotion = await this.promotionService.setRolloutPercentage(tenantId, modelId, 0, userId);
    this.notificationService.notifyMilestone({
      tenantId,
      trainingJobId: modelId,
      milestone: "JOB_FAILED",
      message: "Canary rollout rolled back due to elevated error rate or safety score drop.",
      metadata: { modelId },
    });
    return { rolledBack: true, promotion };
  }
}
