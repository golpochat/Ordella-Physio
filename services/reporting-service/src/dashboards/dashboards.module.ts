import { Module } from "@nestjs/common";
import { DashboardsService } from "@/dashboards/dashboards.service";
import { DashboardsRepository } from "@/dashboards/dashboards.repository";
import { MetricsDataModule } from "@/metrics/metrics-data.module";

@Module({
  imports: [MetricsDataModule],
  providers: [DashboardsService, DashboardsRepository],
  exports: [DashboardsService, DashboardsRepository],
})
export class DashboardsModule {}
