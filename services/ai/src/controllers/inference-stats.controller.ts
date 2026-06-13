import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { InferenceLoggerService } from "@/services/inference-logger.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("inference")
export class InferenceStatsController {
  constructor(private readonly inferenceLoggerService: InferenceLoggerService) {}

  @Get("stats/:modelName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getStats(@CurrentUser() user: AuthenticatedAiUser, @Param("modelName") modelName: string) {
    return this.inferenceLoggerService.aggregateStats(user.tenantId, modelName);
  }
}
