import { Controller, Get, Query, UseGuards } from "@nestjs/common";
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
import { ReportsAppointmentService } from "@/reports/reports-appointment.service";
import { ReportsRevenueService } from "@/reports/reports-revenue.service";
import { ReportsPatientService } from "@/reports/reports-patient.service";

@Controller("reporting/reports")
export class AdvancedReportsController {
  constructor(
    private readonly reportsAppointmentService: ReportsAppointmentService,
    private readonly reportsRevenueService: ReportsRevenueService,
    private readonly reportsPatientService: ReportsPatientService,
  ) {}

  @Get("appointments")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(appointmentReportQuerySchema)
  getAppointmentReport(
    @TenantId() tenantId: string,
    @Query() query: AppointmentReportQueryInput,
  ) {
    return this.reportsAppointmentService.getAppointmentReport(tenantId, query);
  }

  @Get("revenue")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(revenueReportQuerySchema)
  getRevenueReport(@TenantId() tenantId: string, @Query() query: RevenueReportQueryInput) {
    return this.reportsRevenueService.getRevenueReport(tenantId, query);
  }

  @Get("patients")
  @UseGuards(JwtGuard, ReportingTenantGuard, PermissionGuard)
  @RequirePermissions("reporting.read")
  @UseZodValidation(patientReportQuerySchema)
  getPatientReport(@TenantId() tenantId: string, @Query() query: PatientReportQueryInput) {
    return this.reportsPatientService.getPatientReport(tenantId, query);
  }
}
