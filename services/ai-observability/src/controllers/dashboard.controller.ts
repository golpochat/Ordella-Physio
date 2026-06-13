import { Controller, Get, Post, Param, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { BottleneckDetectorService } from "@/services/bottleneck-detector.service";
import { ObservabilityDashboardService } from "@/services/observability-dashboard.service";
import type { AuthenticatedObservabilityUser } from "@/utils/observability-user";

@Controller("observability")
export class DashboardController {
  constructor(
    private readonly dashboardService: ObservabilityDashboardService,
    private readonly bottleneckDetector: BottleneckDetectorService,
  ) {}

  @Get("dashboard")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getDashboard(@CurrentUser() user: AuthenticatedObservabilityUser) {
    return this.dashboardService.getDashboard(user.tenantId);
  }

  @Get("pipeline")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getPipeline(@CurrentUser() user: AuthenticatedObservabilityUser) {
    return this.dashboardService.getPipelineView(user.tenantId);
  }

  @Get("bottlenecks")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listBottlenecks(@CurrentUser() user: AuthenticatedObservabilityUser) {
    return this.bottleneckDetector.listAlerts(user.tenantId);
  }

  @Post("bottlenecks/detect")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  detectBottlenecks(@CurrentUser() user: AuthenticatedObservabilityUser) {
    return this.bottleneckDetector.detectBottlenecks(user.tenantId);
  }

  @Post("bottlenecks/resolve/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  resolveBottleneck(@CurrentUser() user: AuthenticatedObservabilityUser, @Param("id") id: string) {
    return this.bottleneckDetector.resolveAlert(id, user.tenantId);
  }
}
