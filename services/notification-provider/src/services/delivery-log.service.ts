import { Injectable } from "@nestjs/common";
import { toDeliveryLogResponse } from "@/models/DeliveryLog";
import { DeliveryLogRepository } from "@/repositories/delivery-log.repository";
import { deliveryLogNotFoundError } from "@/utils/provider-errors";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";
import { parseListDeliveryLogsQuery } from "@/validators/delivery-log.validator";

@Injectable()
export class DeliveryLogService {
  constructor(private readonly deliveryLogRepository: DeliveryLogRepository) {}

  async listDeliveryLogs(
    query: Record<string, string | string[] | undefined>,
    requestingUser: AuthenticatedProviderUser,
  ) {
    const parsed = parseListDeliveryLogsQuery(query);
    const result = await this.deliveryLogRepository.list({
      tenantId: requestingUser.tenantId,
      channel: parsed.channel,
      provider: parsed.provider,
      status: parsed.status,
      dateStart: parsed.dateStart,
      dateEnd: parsed.dateEnd,
      keyword: parsed.keyword,
      page: parsed.page,
      limit: parsed.limit,
    });

    return {
      data: result.data.map(toDeliveryLogResponse),
      pagination: {
        page: parsed.page,
        limit: parsed.limit,
        total: result.total,
        totalPages: Math.max(1, Math.ceil(result.total / parsed.limit)),
      },
    };
  }

  async getDeliveryLog(id: string, requestingUser: AuthenticatedProviderUser) {
    const record = await this.deliveryLogRepository.findById(id);

    if (!record || record.tenantId !== requestingUser.tenantId) {
      throw deliveryLogNotFoundError();
    }

    return { log: toDeliveryLogResponse(record) };
  }
}
