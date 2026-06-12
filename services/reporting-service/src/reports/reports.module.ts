import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EventsModule } from "@/events/events.module";
import { IngestionModule } from "@/ingestion/ingestion.module";
import { MetricsDataModule } from "@/metrics/metrics-data.module";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { JwtStrategy } from "@/metrics/strategies/jwt.strategy";
import { ReportGeneratorService } from "@/reports/report-generator.service";
import { ReportRequestProcessor } from "@/reports/report-request.processor";
import { AdvancedReportsController } from "@/reports/advanced-reports.controller";
import { ReportConfigController } from "@/reports/report-config.controller";
import { ReportExportController } from "@/reports/report-export.controller";
import { ReportsController } from "@/reports/reports.controller";
import { ReportConfigService } from "@/reports/report-config.service";
import { ReportExportService } from "@/reports/report-export.service";
import { ReportSchedulerService } from "@/reports/report-scheduler.service";
import { SavedReportRepository } from "@/reports/saved-report.repository";
import { ScheduledReportRepository } from "@/reports/scheduled-report.repository";
import { ReportsAppointmentService } from "@/reports/reports-appointment.service";
import { ReportsRevenueService } from "@/reports/reports-revenue.service";
import { ReportsPatientService } from "@/reports/reports-patient.service";
import { IntegrationsModule } from "@/integrations/integrations.module";
import { ReportsRepository } from "@/reports/reports.repository";
import { ReportsService } from "@/reports/reports.service";
import { ReportingTenantGuard } from "@/reports/guards/reporting-tenant.guard";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { FileStorageClient } from "@/integrations/file-storage.client";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    MetricsDataModule,
    IngestionModule,
    IntegrationsModule,
  ],
  controllers: [
    ReportConfigController,
    ReportExportController,
    AdvancedReportsController,
    ReportsController,
  ],
  providers: [
    ReportsRepository,
    SavedReportRepository,
    ScheduledReportRepository,
    ReportGeneratorService,
    ReportsService,
    ReportRequestProcessor,
    ReportConfigService,
    ReportExportService,
    ReportSchedulerService,
    JwtStrategy,
    JwtGuard,
    ReportingTenantGuard,
    ReportsAppointmentService,
    ReportsRevenueService,
    ReportsPatientService,
    AuditLogClient,
    FileStorageClient,
  ],
  exports: [ReportsService],
})
export class ReportsModule {}
