import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import {
  InferenceRouterService,
  type ModelExperimentConfig,
  type MultiRegionRoutingConfig,
} from "@/services/inference-router.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("inference")
export class InferenceRoutingController {
  constructor(private readonly inferenceRouter: InferenceRouterService) {}

  @Post("routing")
  syncRouting(@Body() body: MultiRegionRoutingConfig) {
    return this.inferenceRouter.syncRouting(body);
  }

  @Get("routing")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listRouting(@CurrentUser() user: AuthenticatedAiUser) {
    return this.inferenceRouter.listActiveRoutes(user.tenantId);
  }

  @Post("experiments")
  syncModelExperiment(@Body() body: ModelExperimentConfig) {
    return this.inferenceRouter.syncModelExperiment(body);
  }

  @Get("route")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  routeInference(
    @CurrentUser() user: AuthenticatedAiUser,
    @Query("model") model: string,
    @Query("tenantRegion") tenantRegion?: string,
  ) {
    const route = this.inferenceRouter.routeInference(user.tenantId, model, tenantRegion, user.userId);
    if (!route) {
      return { routed: false };
    }
    return { routed: true, route };
  }
}
