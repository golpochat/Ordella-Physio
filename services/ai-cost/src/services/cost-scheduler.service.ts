import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { aiCostConfig } from "@/config/ai-cost.config";
import { CostAggregationService } from "@/services/cost-aggregation.service";
import { CostAlertService } from "@/services/cost-alert.service";
import { CostRepository } from "@/repositories/cost.repository";

@Injectable()
export class CostSchedulerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CostSchedulerService.name);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly aggregationService: CostAggregationService,
    private readonly alertService: CostAlertService,
    private readonly repository: CostRepository,
  ) {}

  onModuleInit() {
    this.timer = setInterval(() => void this.runCycle(), aiCostConfig.aggregationIntervalMs);
    void this.runCycle();
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  async runCycle() {
    try {
      const result = await this.aggregationService.runScheduledAggregation();
      const tenants = await this.repository.listDistinctTenantIds();
      for (const entry of tenants) {
        await this.alertService.runAlertChecks(entry.tenantId);
      }
      this.logger.log(`Cost aggregation cycle complete (${result.aggregated} tenants)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Aggregation failed";
      this.logger.warn(`Cost scheduler error: ${message}`);
    }
  }
}
