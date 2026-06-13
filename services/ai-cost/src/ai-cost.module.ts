import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { BudgetController } from "@/controllers/budget.controller";
import { CostController } from "@/controllers/cost.controller";
import { HealthController } from "@/controllers/health.controller";
import { InternalCostController } from "@/controllers/internal-cost.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { CostRepository } from "@/repositories/cost.repository";
import { CostAggregationService } from "@/services/cost-aggregation.service";
import { CostAlertService, CostBudgetService } from "@/services/cost-alert.service";
import { CostCalculatorService } from "@/services/cost-calculator.service";
import { CostOptimizerService } from "@/services/cost-optimizer.service";
import { CostSchedulerService } from "@/services/cost-scheduler.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, CostController, BudgetController, InternalCostController],
  providers: [
    CostRepository,
    CostCalculatorService,
    CostAggregationService,
    CostBudgetService,
    CostAlertService,
    CostOptimizerService,
    CostSchedulerService,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiCostModule {}
