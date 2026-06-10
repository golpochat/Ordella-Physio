import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import {
  DashboardsController,
  ExportsController,
  MetricsController,
  ReportingHealthController,
} from "@/metrics/metrics.controller";
import { MetricsService } from "@/metrics/metrics.service";
import { DailyMetricsQuery } from "@/metrics/queries/daily-metrics.query";
import { MonthlyMetricsQuery } from "@/metrics/queries/monthly-metrics.query";
import { KpiMetricsQuery } from "@/metrics/queries/kpi-metrics.query";
import { JwtStrategy } from "@/metrics/strategies/jwt.strategy";
import { JwtGuard } from "@/metrics/guards/jwt.guard";
import { DashboardsModule } from "@/dashboards/dashboards.module";
import { ExportsModule } from "@/exports/exports.module";
import { EventsModule } from "@/events/events.module";
import { MetricsDataModule } from "@/metrics/metrics-data.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    MetricsDataModule,
    DashboardsModule,
    ExportsModule,
  ],
  controllers: [ReportingHealthController, MetricsController, DashboardsController, ExportsController],
  providers: [
    MetricsService,
    DailyMetricsQuery,
    MonthlyMetricsQuery,
    KpiMetricsQuery,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [MetricsService, MetricsDataModule, JwtGuard],
})
export class MetricsModule {}
