import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { MetricsModule } from "@/metrics/metrics.module";
import { IngestionModule } from "@/ingestion/ingestion.module";
import { DashboardsModule } from "@/dashboards/dashboards.module";
import { ExportsModule } from "@/exports/exports.module";
import { JobsModule } from "@/jobs/jobs.module";
import { ReportsModule } from "@/reports/reports.module";
import { ReportingCacheModule } from "@/caching/cache.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureReportingMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    EventsModule,
    ReportingCacheModule,
    IngestionModule,
    MetricsModule,
    DashboardsModule,
    ExportsModule,
    JobsModule,
    ReportsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureReportingMiddleware(consumer);
  }
}
