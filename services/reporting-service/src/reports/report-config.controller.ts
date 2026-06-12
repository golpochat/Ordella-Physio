import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createSavedReportSchema,
  createScheduledReportSchema,
  listSavedReportsSchema,
  updateSavedReportSchema,
  updateScheduledReportSchema,
  UseZodValidation,
  type CreateSavedReportInput,
  type CreateScheduledReportInput,
  type ListSavedReportsInput,
  type UpdateSavedReportInput,
  type UpdateScheduledReportInput,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import type { SecurityUser } from "@ordella/security";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { ReportingTenantGuard } from "@/reports/guards/reporting-tenant.guard";
import { ReportConfigService } from "@/reports/report-config.service";

@Controller("reporting/reports")
export class ReportConfigController {
  constructor(private readonly reportConfigService: ReportConfigService) {}

  @Get("saved")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(listSavedReportsSchema)
  listSaved(@Req() request: OrdellaRequest, @Query() query: ListSavedReportsInput) {
    return this.reportConfigService.listSavedReports(request.user as SecurityUser, query);
  }

  @Post("saved")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.manage")
  @UseZodValidation(createSavedReportSchema)
  createSaved(@Req() request: OrdellaRequest, @Body() body: CreateSavedReportInput) {
    return this.reportConfigService.createSavedReport(request.user as SecurityUser, body);
  }

  @Put("saved/:id")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.manage")
  @UseZodValidation(updateSavedReportSchema)
  updateSaved(
    @Req() request: OrdellaRequest,
    @Param("id") id: string,
    @Body() body: UpdateSavedReportInput,
  ) {
    return this.reportConfigService.updateSavedReport(request.user as SecurityUser, id, body);
  }

  @Delete("saved/:id")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.manage")
  deleteSaved(@Req() request: OrdellaRequest, @Param("id") id: string) {
    return this.reportConfigService.deleteSavedReport(request.user as SecurityUser, id);
  }

  @Get("scheduled")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  listScheduled(@Req() request: OrdellaRequest) {
    return this.reportConfigService.listScheduledReports(request.user as SecurityUser);
  }

  @Post("scheduled")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.manage")
  @UseZodValidation(createScheduledReportSchema)
  createScheduled(@Req() request: OrdellaRequest, @Body() body: CreateScheduledReportInput) {
    return this.reportConfigService.createScheduledReport(request.user as SecurityUser, body);
  }

  @Put("scheduled/:id")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.manage")
  @UseZodValidation(updateScheduledReportSchema)
  updateScheduled(
    @Req() request: OrdellaRequest,
    @Param("id") id: string,
    @Body() body: UpdateScheduledReportInput,
  ) {
    return this.reportConfigService.updateScheduledReport(request.user as SecurityUser, id, body);
  }
}
