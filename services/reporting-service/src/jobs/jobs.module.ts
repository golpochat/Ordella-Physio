import { Module } from "@nestjs/common";
import { DailyRollupJob } from "@/jobs/cron/daily-rollup.job";
import { MonthlyRollupJob } from "@/jobs/cron/monthly-rollup.job";
import { CleanupJob } from "@/jobs/cron/cleanup.job";
import { CacheWarmupJob } from "@/jobs/cron/cache-warmup.job";
import { MetricsDataModule } from "@/metrics/metrics-data.module";
import { MetricsModule } from "@/metrics/metrics.module";
import { IngestionModule } from "@/ingestion/ingestion.module";
import { DashboardsModule } from "@/dashboards/dashboards.module";

@Module({
  imports: [MetricsDataModule, MetricsModule, IngestionModule, DashboardsModule],
  providers: [DailyRollupJob, MonthlyRollupJob, CleanupJob, CacheWarmupJob],
})
export class JobsModule {}
