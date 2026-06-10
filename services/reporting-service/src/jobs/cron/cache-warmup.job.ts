import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ReportingCacheService } from "@/caching/cache.service";
import { MetricsService } from "@/metrics/metrics.service";

@Injectable()
export class CacheWarmupJob {
  private readonly logger = new Logger(CacheWarmupJob.name);

  constructor(
    private readonly cacheService: ReportingCacheService,
    private readonly metricsService: MetricsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handle() {
    this.logger.log("Cache warm-up job started");
    await this.metricsService.getKpiMetrics("system", { page: 1, limit: 20 });
    await this.cacheService.invalidateTenant("system");
    this.logger.log("Cache warm-up job placeholder completed");
  }
}
