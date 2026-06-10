import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { IngestionRepository } from "@/ingestion/ingestion.repository";
import { DashboardsRepository } from "@/dashboards/dashboards.repository";

@Injectable()
export class CleanupJob {
  private readonly logger = new Logger(CleanupJob.name);

  constructor(
    private readonly ingestionRepository: IngestionRepository,
    private readonly dashboardsRepository: DashboardsRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handle() {
    this.logger.log("Cleanup job started");
    const retentionCutoff = new Date();
    retentionCutoff.setUTCDate(retentionCutoff.getUTCDate() - 90);

    await this.ingestionRepository.deleteOlderThan("system", retentionCutoff);
    await this.dashboardsRepository.deleteExpired("system", new Date());

    this.logger.log("Cleanup job placeholder completed");
  }
}
