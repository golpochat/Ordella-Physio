import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DeliveryLogRepository } from "@/repositories/delivery-log.repository";
import { DeliveryService } from "@/services/delivery.service";

const MAX_RETRIES = Number(process.env.NOTIFICATION_MAX_RETRIES ?? "3");

@Injectable()
export class RetryService {
  private readonly logger = new Logger(RetryService.name);

  constructor(
    private readonly deliveryLogRepository: DeliveryLogRepository,
    private readonly deliveryService: DeliveryService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async runRetrySweep() {
    const due = await this.deliveryLogRepository.findDueRetries(new Date(), MAX_RETRIES);
    let processed = 0;

    for (const log of due) {
      try {
        await this.deliveryService.resendFromLog(log);
        processed += 1;
      } catch (error) {
        this.logger.warn(
          `Retry sweep failed for log ${log.id}`,
          error instanceof Error ? error.message : error,
        );
      }
    }

    if (processed > 0) {
      this.logger.log(`Retry sweep processed ${processed} delivery log(s).`);
    }
  }
}
