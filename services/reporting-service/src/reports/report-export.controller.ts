import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import {
  appointmentReportQuerySchema,
  patientReportQuerySchema,
  revenueReportQuerySchema,
  UseZodValidation,
  type AppointmentReportQueryInput,
  type PatientReportQueryInput,
  type RevenueReportQueryInput,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { TenantId } from "@/metrics/guards/tenant-id.decorator";
import { ReportingTenantGuard } from "@/reports/guards/reporting-tenant.guard";
import { ReportExportService } from "@/reports/report-export.service";
import { CurrentUser } from "@/reports/guards/current-user.decorator";
import type { AuthenticatedReportingUser } from "@/utils/reporting-helpers";

@Controller("reporting/reports")
export class ReportExportController {
  constructor(private readonly reportExportService: ReportExportService) {}

  @Get("appointments/export")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(appointmentReportQuerySchema)
  exportAppointments(
    @TenantId() tenantId: string,
    @Query() query: AppointmentReportQueryInput,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedReportingUser,
  ) {
    return this.reportExportService.exportAppointmentReport(tenantId, query, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Get("revenue/export")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(revenueReportQuerySchema)
  exportRevenue(
    @TenantId() tenantId: string,
    @Query() query: RevenueReportQueryInput,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedReportingUser,
  ) {
    return this.reportExportService.exportRevenueReport(tenantId, query, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Get("patients/export")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(patientReportQuerySchema)
  exportPatients(
    @TenantId() tenantId: string,
    @Query() query: PatientReportQueryInput,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedReportingUser,
  ) {
    return this.reportExportService.exportPatientReport(tenantId, query, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }
}
