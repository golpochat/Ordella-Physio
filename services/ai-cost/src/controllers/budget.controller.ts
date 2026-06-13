import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { CostAlertService, CostBudgetService } from "@/services/cost-alert.service";
import type { AuthenticatedCostUser } from "@/utils/cost-user";

@Controller("cost")
export class BudgetController {
  constructor(
    private readonly budgetService: CostBudgetService,
    private readonly alertService: CostAlertService,
  ) {}

  @Get("budget")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getBudget(@CurrentUser() user: AuthenticatedCostUser) {
    return this.budgetService.getBudgetWithUsage(user.tenantId);
  }

  @Post("budget")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  setBudget(
    @CurrentUser() user: AuthenticatedCostUser,
    @Body()
    body: {
      monthlyTokenBudget?: number;
      monthlyCostBudget?: number;
      softLimitPercentage?: number;
      hardLimitPercentage?: number;
    },
  ) {
    return this.budgetService.updateBudget(user.tenantId, body);
  }

  @Put("budget")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  updateBudget(
    @CurrentUser() user: AuthenticatedCostUser,
    @Body()
    body: {
      monthlyTokenBudget?: number;
      monthlyCostBudget?: number;
      softLimitPercentage?: number;
      hardLimitPercentage?: number;
    },
  ) {
    return this.budgetService.updateBudget(user.tenantId, body);
  }

  @Post("budget/check-alerts")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  checkAlerts(@CurrentUser() user: AuthenticatedCostUser) {
    return this.alertService.runAlertChecks(user.tenantId);
  }
}
