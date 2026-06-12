import { Injectable } from "@nestjs/common";
import type { NotificationChannel } from "@/generated/prisma";
import type { ProviderConfigRecord } from "@/models/ProviderConfig";
import { ProviderConfigRepository } from "@/repositories/provider-config.repository";
import { noProviderConfiguredError } from "@/utils/provider-errors";

@Injectable()
export class FailoverService {
  constructor(private readonly providerConfigRepository: ProviderConfigRepository) {}

  async selectProvidersForChannel(
    tenantId: string,
    channel: NotificationChannel,
  ): Promise<ProviderConfigRecord[]> {
    const configs = await this.providerConfigRepository.listActiveByTenantAndChannel(
      tenantId,
      channel,
    );

    const healthy = configs.filter((config) => config.isActive && config.isHealthy);

    if (healthy.length === 0) {
      throw noProviderConfiguredError();
    }

    return healthy.sort((left, right) => left.priority - right.priority);
  }
}
