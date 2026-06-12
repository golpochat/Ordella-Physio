import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ProviderConfigRepository } from "@/repositories/provider-config.repository";
import { ProviderRegistryService } from "@/services/provider-registry.service";

@Injectable()
export class ProviderHealthService {
  private readonly logger = new Logger(ProviderHealthService.name);

  constructor(
    private readonly providerConfigRepository: ProviderConfigRepository,
    private readonly providerRegistry: ProviderRegistryService,
  ) {}

  @Cron("*/5 * * * *")
  async runHealthSweep() {
    const configs = await this.providerConfigRepository.listAllForHealthCheck();
    let checked = 0;

    for (const config of configs) {
      const adapter = this.providerRegistry.getProviderForChannel(config.channel, config.provider);
      if (!adapter) {
        continue;
      }

      try {
        const result = await adapter.ping();
        await this.providerConfigRepository.update(config.id, {
          isHealthy: result.healthy,
          lastHealthCheckAt: new Date(),
          ...(result.healthy ? {} : { isActive: false }),
        });

        if (!result.healthy) {
          this.logger.warn(
            `Provider ${config.provider} for tenant ${config.tenantId} marked unhealthy and disabled.`,
          );
        }

        checked += 1;
      } catch (error) {
        await this.providerConfigRepository.update(config.id, {
          isHealthy: false,
          isActive: false,
          lastHealthCheckAt: new Date(),
        });
        this.logger.warn(
          `Health check failed for ${config.provider}`,
          error instanceof Error ? error.message : error,
        );
      }
    }

    if (checked > 0) {
      this.logger.log(`Health sweep checked ${checked} provider configuration(s).`);
    }
  }

  async checkProvider(configId: string) {
    const config = await this.providerConfigRepository.findById(configId);
    if (!config) {
      return null;
    }

    const adapter = this.providerRegistry.getProviderForChannel(config.channel, config.provider);
    if (!adapter) {
      return this.providerConfigRepository.update(config.id, {
        isHealthy: false,
        isActive: false,
        lastHealthCheckAt: new Date(),
      });
    }

    const result = await adapter.ping();
    return this.providerConfigRepository.update(config.id, {
      isHealthy: result.healthy,
      lastHealthCheckAt: new Date(),
      ...(result.healthy ? {} : { isActive: false }),
    });
  }
}
