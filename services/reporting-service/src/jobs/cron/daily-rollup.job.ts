import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MetricsRepository } from "@/metrics/metrics.repository";
import { toIsoDate } from "@/utils/date-helpers";

@Injectable()
export class DailyRollupJob {
  private readonly logger = new Logger(DailyRollupJob.name);

  constructor(private readonly metricsRepository: MetricsRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handle() {
    this.logger.log("Daily rollup job started");
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    await this.metricsRepository.upsertDailyMetrics("system", yesterday, {
      totalAppointments: 0,
      completedAppointments: 0,
      cancelledAppointments: 0,
      noShowAppointments: 0,
      newPatients: 0,
      revenue: 0,
      outstandingBalance: 0,
    });

    this.logger.log(`Daily rollup placeholder completed for ${toIsoDate(yesterday)}`);
  }
}
