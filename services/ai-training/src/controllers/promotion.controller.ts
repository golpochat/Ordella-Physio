import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { AutoRetrainingService } from "@/services/auto-retraining.service";
import { CanaryRolloutService } from "@/services/canary-rollout.service";
import { ModelPromotionService } from "@/services/model-promotion.service";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";
import { trainingValidationError } from "@/utils/training-errors";

@Controller("models")
export class PromotionController {
  constructor(
    private readonly promotionService: ModelPromotionService,
    private readonly canaryService: CanaryRolloutService,
    private readonly autoRetrainingService: AutoRetrainingService,
  ) {}

  @Post(":id/promote/staging")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  promoteToStaging(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.promotionService.promoteToStaging(user.tenantId, id, user.userId);
  }

  @Post(":id/promote/production")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  promoteToProduction(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.canaryService.startCanary(user.tenantId, id, user.userId);
  }

  @Post(":id/deprecate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  deprecateModel(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.promotionService.deprecateModel(user.tenantId, id, user.userId);
  }

  @Post(":id/rollout")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  setRollout(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    const percentage = Number(body.rolloutPercentage);
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      throw trainingValidationError([
        { field: "rolloutPercentage", message: "Rollout percentage must be between 0 and 100." },
      ]);
    }
    return this.promotionService.setRolloutPercentage(user.tenantId, id, percentage, user.userId);
  }

  @Get(":id/promotion")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  async getPromotion(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    const promotion = await this.promotionService.getPromotion(user.tenantId, id);
    const canary = await this.canaryService.monitorCanary(user.tenantId, id);
    return { promotion, canary };
  }

  @Post(":id/canary/adjust")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  autoAdjustCanary(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.canaryService.autoAdjustRollout(user.tenantId, id, user.userId);
  }

  @Post(":id/retrain/drift")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  retrainFromDrift(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    const triggers = Array.isArray(body.triggers)
      ? body.triggers.filter((item): item is string => typeof item === "string")
      : ["DATA_DRIFT"];
    return this.autoRetrainingService.triggerFromDriftEvent({
      tenantId: user.tenantId,
      modelId: id,
      triggers,
      requestHeaders: {
        "x-tenant-id": user.tenantId,
        "x-user-id": user.userId,
        "x-user-role": user.role,
      },
    });
  }
}
