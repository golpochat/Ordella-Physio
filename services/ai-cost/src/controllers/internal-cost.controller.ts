import { Body, Controller, Post, Headers, UnauthorizedException } from "@nestjs/common";
import { CostAggregationService } from "@/services/cost-aggregation.service";
import { CostAlertService, CostBudgetService } from "@/services/cost-alert.service";

@Controller("cost/internal")
export class InternalCostController {
  constructor(
    private readonly aggregationService: CostAggregationService,
    private readonly budgetService: CostBudgetService,
    private readonly alertService: CostAlertService,
  ) {}

  @Post("events")
  recordEvent(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      modelId?: string;
      feature?: string;
      tokensPrompt?: number;
      tokensCompletion?: number;
      metadata?: Record<string, unknown>;
    },
  ) {
    if (!service || !tenantId) {
      throw new UnauthorizedException("Internal service headers required.");
    }

    return this.aggregationService.recordEvent({ tenantId, ...body }).then(async (result) => {
      const tokens = (body.tokensPrompt ?? 0) + (body.tokensCompletion ?? 0);
      await this.budgetService.incrementUsage(tenantId, tokens, result.cost);
      void this.alertService.runAlertChecks(tenantId);
      return result;
    });
  }
}
