import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { toDriftEventRecord } from "@/models/AIDriftEvent";
import { DriftDashboardService } from "@/services/drift-dashboard.service";
import { DriftDetectionService } from "@/services/drift-detection.service";
import { DriftMetricsService } from "@/services/drift-metrics.service";
import { DriftMitigationService } from "@/services/drift-mitigation.service";
import type { AuthenticatedMonitoringUser } from "@/utils/monitoring-user";

@Controller("drift")
export class DriftController {
  constructor(
    private readonly dashboardService: DriftDashboardService,
    private readonly detectionService: DriftDetectionService,
    private readonly metricsService: DriftMetricsService,
    private readonly mitigationService: DriftMitigationService,
  ) {}

  private requestHeaders(user: AuthenticatedMonitoringUser, request: Request) {
    return {
      ...(request.headers.authorization ? { Authorization: request.headers.authorization } : {}),
      "x-tenant-id": user.tenantId,
      "x-user-id": user.userId,
      "x-user-role": user.role,
    };
  }

  @Get("models/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getSummary(@CurrentUser() user: AuthenticatedMonitoringUser, @Param("id") id: string) {
    return this.dashboardService.getSummary(user.tenantId, id);
  }

  @Get("models/:id/events")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listEvents(@CurrentUser() user: AuthenticatedMonitoringUser, @Param("id") id: string) {
    return this.dashboardService.listEvents(user.tenantId, id);
  }

  @Get("models/:id/metrics")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listMetrics(@CurrentUser() user: AuthenticatedMonitoringUser, @Param("id") id: string) {
    return this.metricsService.listMetrics(user.tenantId, id);
  }

  @Post("models/:id/run")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  runDetection(
    @CurrentUser() user: AuthenticatedMonitoringUser,
    @Param("id") id: string,
    @Req() request: Request,
  ) {
    return this.detectionService.runFullDetection(
      user.tenantId,
      id,
      this.requestHeaders(user, request),
    );
  }

  @Post("models/:id/events/:eventId/resolve")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  async resolveEvent(
    @CurrentUser() user: AuthenticatedMonitoringUser,
    @Param("id") _id: string,
    @Param("eventId") eventId: string,
    @Body() body: Record<string, unknown>,
  ) {
    const mitigationAction =
      typeof body.mitigationAction === "string" ? body.mitigationAction : "RESOLVED_MANUALLY";
    const resolved = await this.mitigationService.resolveEvent(
      user.tenantId,
      eventId,
      mitigationAction,
    );
    return resolved ? toDriftEventRecord(resolved) : null;
  }

  @Post("models/:id/mitigate/retrain")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  triggerRetrain(
    @CurrentUser() user: AuthenticatedMonitoringUser,
    @Param("id") id: string,
    @Req() request: Request,
  ) {
    return this.mitigationService.triggerRetraining(
      user.tenantId,
      id,
      ["MANUAL"],
      this.requestHeaders(user, request),
    );
  }

  @Post("models/:id/mitigate/rollback")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  rollback(
    @CurrentUser() user: AuthenticatedMonitoringUser,
    @Param("id") id: string,
    @Req() request: Request,
  ) {
    return this.mitigationService.rollbackIfIssues(
      user.tenantId,
      id,
      this.requestHeaders(user, request),
    );
  }

  @Post("models/:id/mitigate/reduce-rollout")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  reduceRollout(
    @CurrentUser() user: AuthenticatedMonitoringUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
    @Req() request: Request,
  ) {
    const percentage = Number(body.rolloutPercentage ?? 10);
    return this.mitigationService.reduceRollout(
      user.tenantId,
      id,
      percentage,
      this.requestHeaders(user, request),
    );
  }
}
