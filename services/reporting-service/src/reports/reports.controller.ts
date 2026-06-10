import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import {
  createReportRequestSchema,
  downloadReportSchema,
  listReportRequestsSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import type { Response } from "express";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { TenantId } from "@/metrics/guards/tenant-id.decorator";
import { ReportingTenantGuard } from "@/reports/guards/reporting-tenant.guard";
import { ReportsService } from "@/reports/reports.service";
import type { SecurityUser } from "@ordella/security";
import type {
  CreateReportRequestInput,
  DownloadReportInput,
  ListReportRequestsInput,
} from "@ordella/validation";

@Controller("reporting/reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post("request")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(createReportRequestSchema)
  createRequest(
    @TenantId() tenantId: string,
    @Body() dto: CreateReportRequestInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as SecurityUser;
    return this.reportsService.createRequest(tenantId, user, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(listReportRequestsSchema, "query")
  list(
    @TenantId() tenantId: string,
    @Query() query: ListReportRequestsInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as SecurityUser;
    return this.reportsService.listReports(tenantId, user, query);
  }

  @Get(":id")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  getById(@TenantId() tenantId: string, @Param("id") id: string, @Req() request: OrdellaRequest) {
    const user = request.user as SecurityUser;
    return this.reportsService.getReport(tenantId, user, id);
  }

  @Get(":id/download")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(downloadReportSchema, "query")
  async download(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Query() query: DownloadReportInput,
    @Req() request: OrdellaRequest,
    @Res() response: Response,
  ) {
    const user = request.user as SecurityUser;
    const result = await this.reportsService.downloadReport(tenantId, user, id, query);

    response.setHeader("Content-Type", result.contentType);
    response.setHeader("Content-Disposition", `attachment; filename="${result.filename}"`);
    response.send(result.content);
  }
}
