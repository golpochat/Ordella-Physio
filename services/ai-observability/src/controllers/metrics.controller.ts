import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { MetricType } from "@/models/AIMetricPoint";
import { HeatmapService } from "@/services/heatmap.service";
import { MetricsService } from "@/services/metrics.service";
import type { AuthenticatedObservabilityUser } from "@/utils/observability-user";

@Controller("observability")
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly heatmapService: HeatmapService,
  ) {}

  @Get("metrics")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getMetrics(
    @CurrentUser() user: AuthenticatedObservabilityUser,
    @Query("metricType") metricType?: MetricType,
    @Query("since") since?: string,
  ) {
    return this.metricsService.aggregateMetrics(
      user.tenantId,
      metricType ?? "latency",
      since ? new Date(since) : undefined,
    );
  }

  @Get("metrics/models")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getMetricsByModel(
    @CurrentUser() user: AuthenticatedObservabilityUser,
    @Query("modelId") modelId: string,
    @Query("since") since?: string,
  ) {
    return this.metricsService.getMetricsByModel(
      user.tenantId,
      modelId,
      since ? new Date(since) : undefined,
    );
  }

  @Get("metrics/regions")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getMetricsByRegion(
    @CurrentUser() user: AuthenticatedObservabilityUser,
    @Query("region") region: string,
    @Query("since") since?: string,
  ) {
    return this.metricsService.getMetricsByRegion(
      user.tenantId,
      region,
      since ? new Date(since) : undefined,
    );
  }

  @Get("metrics/heatmap/latency")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  latencyHeatmap(@CurrentUser() user: AuthenticatedObservabilityUser, @Query("since") since?: string) {
    return this.heatmapService.generateLatencyHeatmap(user.tenantId, since ? new Date(since) : undefined);
  }

  @Get("metrics/heatmap/error-rate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  errorHeatmap(@CurrentUser() user: AuthenticatedObservabilityUser, @Query("since") since?: string) {
    return this.heatmapService.generateErrorRateHeatmap(user.tenantId, since ? new Date(since) : undefined);
  }

  @Get("metrics/heatmap/throughput")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  throughputHeatmap(@CurrentUser() user: AuthenticatedObservabilityUser, @Query("since") since?: string) {
    return this.heatmapService.generateThroughputHeatmap(user.tenantId, since ? new Date(since) : undefined);
  }

  @Get("metrics/percentiles")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  latencyPercentiles(
    @CurrentUser() user: AuthenticatedObservabilityUser,
    @Query("modelId") modelId?: string,
    @Query("region") region?: string,
  ) {
    return this.metricsService.getLatencyPercentiles(user.tenantId, modelId, region);
  }
}
