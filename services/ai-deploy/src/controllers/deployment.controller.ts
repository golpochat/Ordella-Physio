import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { StartDeploymentInput } from "@/models/AIModelDeployment";
import { DeploymentService } from "@/services/deployment.service";
import type { AuthenticatedDeployUser } from "@/utils/deploy-user";

@Controller("deploy")
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  startDeployment(@CurrentUser() user: AuthenticatedDeployUser, @Body() body: StartDeploymentInput) {
    return this.deploymentService.startDeployment(user.tenantId, body);
  }

  @Get(":modelId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getStatus(@CurrentUser() user: AuthenticatedDeployUser, @Param("modelId") modelId: string) {
    return this.deploymentService.getStatus(user.tenantId, modelId);
  }

  @Post(":modelId/rollback")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  rollback(@CurrentUser() user: AuthenticatedDeployUser, @Param("modelId") modelId: string) {
    return this.deploymentService.rollback(user.tenantId, modelId);
  }

  @Post(":modelId/regions/:region/rollout")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_PROMOTION_MANAGE)
  adjustRollout(
    @CurrentUser() user: AuthenticatedDeployUser,
    @Param("modelId") modelId: string,
    @Param("region") region: string,
    @Body() body: { rolloutPercent: number },
  ) {
    return this.deploymentService.adjustRollout(
      user.tenantId,
      modelId,
      region,
      body.rolloutPercent,
    );
  }

  @Get(":modelId/metrics")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getMetrics(
    @CurrentUser() user: AuthenticatedDeployUser,
    @Param("modelId") modelId: string,
    @Query("version") version?: string,
  ) {
    return this.deploymentService.getMetrics(user.tenantId, modelId, version);
  }

  @Get(":modelId/route")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  routeInference(
    @CurrentUser() user: AuthenticatedDeployUser,
    @Param("modelId") modelId: string,
    @Query("version") version: string,
    @Query("tenantRegion") tenantRegion?: string,
  ) {
    return this.deploymentService.routeInference(user.tenantId, modelId, version, tenantRegion);
  }
}
