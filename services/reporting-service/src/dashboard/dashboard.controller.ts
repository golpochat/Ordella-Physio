import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { dashboardMetricsQuerySchema, UseZodValidation } from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { TenantId } from "@/metrics/guards/tenant-id.decorator";
import { DashboardMetricsService } from "@/dashboard/dashboard.service";
import type { DashboardMetricsQueryDto } from "@/dashboard/dto/dashboard-metrics-query.dto";

@Controller("reporting")
export class DashboardMetricsController {
  constructor(private readonly dashboardMetricsService: DashboardMetricsService) {}

  @Get("dashboard")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(dashboardMetricsQuerySchema)
  getDashboard(@TenantId() tenantId: string, @Query() query: DashboardMetricsQueryDto) {
    return this.dashboardMetricsService.getDashboardMetrics(tenantId, query);
  }
}
