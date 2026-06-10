import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MetricsRepository } from "@/metrics/metrics.repository";
import { toMonthKey } from "@/utils/date-helpers";

@Injectable()
export class MonthlyRollupJob {
  private readonly logger = new Logger(MonthlyRollupJob.name);

  constructor(private readonly metricsRepository: MetricsRepository) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handle() {
    this.logger.log("Monthly rollup job started");
    const previousMonth = new Date();
    previousMonth.setUTCMonth(previousMonth.getUTCMonth() - 1);
    const month = toMonthKey(previousMonth);

    await this.metricsRepository.upsertMonthlyMetrics("system", month, {
      totalAppointments: 0,
      completedAppointments: 0,
      cancelledAppointments: 0,
      noShowAppointments: 0,
      newPatients: 0,
      revenue: 0,
      outstandingBalance: 0,
    });

    this.logger.log(`Monthly rollup placeholder completed for ${month}`);
  }
}
