import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { ExperimentVariant } from "@/models/Experiment";
import { ExperimentService } from "@/services/experiment.service";
import type { AuthenticatedFeatureFlagsUser } from "@/utils/feature-flags-user";

@Controller("experiments")
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  list(@CurrentUser() user: AuthenticatedFeatureFlagsUser) {
    return this.experimentService.listExperiments(user.tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getOne(@CurrentUser() user: AuthenticatedFeatureFlagsUser, @Param("id") id: string) {
    return this.experimentService.getExperiment(user.tenantId, id);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  create(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Body()
    body: {
      name: string;
      description?: string;
      variants?: ExperimentVariant[];
      targetAudience?: Record<string, unknown>;
      metricsTracked?: string[];
      experimentType?: string;
      modelKey?: string;
    },
  ) {
    return this.experimentService.createExperiment(user.tenantId, body);
  }

  @Post(":id/start")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  start(@CurrentUser() user: AuthenticatedFeatureFlagsUser, @Param("id") id: string) {
    return this.experimentService.startExperiment(user.tenantId, id);
  }

  @Post(":id/pause")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  pause(@CurrentUser() user: AuthenticatedFeatureFlagsUser, @Param("id") id: string) {
    return this.experimentService.pauseExperiment(user.tenantId, id);
  }

  @Post(":id/complete")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  complete(@CurrentUser() user: AuthenticatedFeatureFlagsUser, @Param("id") id: string) {
    return this.experimentService.completeExperiment(user.tenantId, id);
  }

  @Get(":id/results")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  results(@CurrentUser() user: AuthenticatedFeatureFlagsUser, @Param("id") id: string) {
    return this.experimentService.computeResults(user.tenantId, id);
  }

  @Post(":id/assign")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  assign(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Param("id") id: string,
    @Body() body: { userId?: string },
  ) {
    return this.experimentService.assignVariant(id, user.tenantId, body.userId ?? user.userId);
  }

  @Post(":id/events")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  recordEvent(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Param("id") id: string,
    @Body() body: { eventType: string; userId?: string; payload?: Record<string, unknown> },
  ) {
    return this.experimentService.recordEvent(
      user.tenantId,
      id,
      body.userId ?? user.userId,
      body.eventType,
      body.payload,
    );
  }
}
