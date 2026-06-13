import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import type { GatewayRequest } from "@/middleware/gateway-auth.middleware";
import { BudgetService } from "@/services/budget.service";

@Injectable()
export class BudgetCheckMiddleware implements NestMiddleware {
  constructor(private readonly budgetService: BudgetService) {}

  async use(req: GatewayRequest, _res: Response, next: NextFunction) {
    const context = req.gatewayContext;
    if (!context) return next();

    const estimatedTokens = Number((req.body as { maxTokens?: number })?.maxTokens ?? 1000);
    const estimatedCost = (estimatedTokens / 1000) * 0.002;
    const result = await this.budgetService.checkBudget(context.tenantId, estimatedTokens, estimatedCost);

    if (!result.allowed) {
      throw new HttpException(
        { message: result.message ?? "Monthly AI budget hard limit reached.", budget: result },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    (req as GatewayRequest & { budgetWarning?: string }).budgetWarning = result.softLimitReached
      ? result.message
      : undefined;
    next();
  }
}
