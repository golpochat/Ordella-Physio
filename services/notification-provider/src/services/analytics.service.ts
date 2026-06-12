import { Injectable } from "@nestjs/common";
import type { NotificationChannel, NotificationProviderName } from "@/generated/prisma";
import { DeliveryLogRepository } from "@/repositories/delivery-log.repository";
import { DeliveryQueueService } from "@/services/delivery-queue.service";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";
import {
  parseAnalyticsQuery,
  type AnalyticsStatsResponse,
  type ChannelStats,
  type ProviderStats,
} from "@/validators/analytics.validator";

const CHANNELS: NotificationChannel[] = ["EMAIL", "SMS", "PUSH", "WHATSAPP", "VIBER"];
const PROVIDERS: NotificationProviderName[] = ["SENDGRID", "TWILIO", "FIREBASE", "VIBER", "NONE"];

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly deliveryLogRepository: DeliveryLogRepository,
    private readonly deliveryQueueService: DeliveryQueueService,
  ) {}

  async getStats(
    query: Record<string, string | string[] | undefined>,
    requestingUser: AuthenticatedProviderUser,
  ): Promise<AnalyticsStatsResponse> {
    const parsed = parseAnalyticsQuery(query);
    const aggregates = await this.deliveryLogRepository.aggregateStats(
      requestingUser.tenantId,
      parsed.dateStart,
      parsed.dateEnd,
    );

    const byChannel = {} as Record<NotificationChannel, ChannelStats>;
    for (const channel of CHANNELS) {
      byChannel[channel] = aggregates.byChannel[channel] ?? { sent: 0, failed: 0 };
    }

    const byProvider = {} as Record<NotificationProviderName, ProviderStats>;
    for (const provider of PROVIDERS) {
      byProvider[provider] = aggregates.byProvider[provider] ?? { sent: 0, failed: 0 };
    }

    const sent = aggregates.totals.sent;
    const failed = aggregates.totals.failed;
    const total = sent + failed;
    const successRate = total > 0 ? Math.round((sent / total) * 1000) / 10 : 100;

    const queueStats = this.deliveryQueueService.getStats();

    return {
      totals: { sent, failed },
      successRate,
      byChannel,
      byProvider,
      queue: {
        pending: queueStats.pending,
        lastProcessedAt: queueStats.lastProcessedAt,
      },
    };
  }
}
