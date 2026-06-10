import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import {
  dashboardQuerySchema,
  exportCsvSchema,
  exportPdfSchema,
  metricsQuerySchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { MetricsService } from "@/metrics/metrics.service";
import { DashboardsService } from "@/dashboards/dashboards.service";
import { ExportsService } from "@/exports/exports.service";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { TenantId } from "@/metrics/guards/tenant-id.decorator";
import type { MetricsQueryDto } from "@/metrics/dto/metrics-query.dto";
import type { DashboardQueryDto } from "@/dashboards/dto/dashboard-query.dto";
import type { ExportCsvDto } from "@/exports/dto/export-csv.dto";
import type { ExportPdfDto } from "@/exports/dto/export-pdf.dto";

@Controller("reporting")
export class ReportingHealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "reporting-service" };
  }
}

@Controller("reporting/metrics")
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get("daily")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(metricsQuerySchema)
  getDaily(@TenantId() tenantId: string, @Query() query: MetricsQueryDto) {
    return this.metricsService.getDailyMetrics(tenantId, query);
  }

  @Get("weekly")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(metricsQuerySchema)
  getWeekly(@TenantId() tenantId: string, @Query() query: MetricsQueryDto) {
    return this.metricsService.getWeeklyMetrics(tenantId, query);
  }

  @Get("monthly")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(metricsQuerySchema)
  getMonthly(@TenantId() tenantId: string, @Query() query: MetricsQueryDto) {
    return this.metricsService.getMonthlyMetrics(tenantId, query);
  }

  @Get("kpi")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(metricsQuerySchema)
  getKpi(@TenantId() tenantId: string, @Query() query: MetricsQueryDto) {
    return this.metricsService.getKpiMetrics(tenantId, query);
  }
}

@Controller("reporting/dashboards")
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get(":type")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(dashboardQuerySchema)
  getDashboard(
    @TenantId() tenantId: string,
    @Param("type") dashboardType: DashboardQueryDto["dashboardType"],
    @Query() query: DashboardQueryDto,
  ) {
    return this.dashboardsService.getDashboard(tenantId, { ...query, dashboardType });
  }
}

@Controller("reporting/exports")
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Get("csv")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(exportCsvSchema)
  exportCsv(
    @TenantId() tenantId: string,
    @Query() dto: ExportCsvDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.exportsService.exportCsv(tenantId, dto, request.correlationId);
  }

  @Get("pdf")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(exportPdfSchema)
  exportPdf(
    @TenantId() tenantId: string,
    @Query() dto: ExportPdfDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.exportsService.exportPdf(tenantId, dto, request.correlationId);
  }
}
