import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EventsModule } from "@/events/events.module";
import { IngestionModule } from "@/ingestion/ingestion.module";
import { MetricsDataModule } from "@/metrics/metrics-data.module";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { JwtStrategy } from "@/metrics/strategies/jwt.strategy";
import { ReportGeneratorService } from "@/reports/report-generator.service";
import { ReportRequestProcessor } from "@/reports/report-request.processor";
import { ReportsController } from "@/reports/reports.controller";
import { ReportsRepository } from "@/reports/reports.repository";
import { ReportsService } from "@/reports/reports.service";
import { ReportingTenantGuard } from "@/reports/guards/reporting-tenant.guard";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    MetricsDataModule,
    IngestionModule,
  ],
  controllers: [ReportsController],
  providers: [
    ReportsRepository,
    ReportGeneratorService,
    ReportsService,
    ReportRequestProcessor,
    JwtStrategy,
    JwtGuard,
    ReportingTenantGuard,
  ],
  exports: [ReportsService],
})
export class ReportsModule {}
