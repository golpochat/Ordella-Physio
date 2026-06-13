import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { CostPeriod } from "@/models/AICostUsageAggregate";
import { CostAggregationService } from "@/services/cost-aggregation.service";
import { CostAlertService } from "@/services/cost-alert.service";
import { CostOptimizerService } from "@/services/cost-optimizer.service";
import type { AuthenticatedCostUser } from "@/utils/cost-user";

@Controller("cost")
export class CostController {
  constructor(
    private readonly aggregationService: CostAggregationService,
    private readonly alertService: CostAlertService,
    private readonly optimizerService: CostOptimizerService,
  ) {}

  @Get("summary")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getSummary(
    @CurrentUser() user: AuthenticatedCostUser,
    @Query("period") period?: CostPeriod,
  ) {
    return this.aggregationService.getTenantCostSummary(user.tenantId, period ?? "MONTHLY");
  }

  @Get("models")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getCostByModel(
    @CurrentUser() user: AuthenticatedCostUser,
    @Query("period") period?: CostPeriod,
  ) {
    return this.aggregationService.getCostByModel(user.tenantId, period ?? "MONTHLY");
  }

  @Get("features")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getCostByFeature(
    @CurrentUser() user: AuthenticatedCostUser,
    @Query("period") period?: CostPeriod,
  ) {
    return this.aggregationService.getCostByFeature(user.tenantId, period ?? "MONTHLY");
  }

  @Get("trends")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getTrends(
    @CurrentUser() user: AuthenticatedCostUser,
    @Query("period") period?: CostPeriod,
    @Query("limit") limit?: string,
  ) {
    return this.aggregationService.getCostTrends(user.tenantId, period ?? "DAILY", limit ? Number(limit) : 30);
  }

  @Get("alerts")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listAlerts(
    @CurrentUser() user: AuthenticatedCostUser,
    @Query("unresolved") unresolved?: string,
  ) {
    return this.alertService.listAlerts(user.tenantId, unresolved === "true");
  }

  @Post("alerts/:id/resolve")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  resolveAlert(@CurrentUser() user: AuthenticatedCostUser, @Param("id") id: string) {
    return this.alertService.resolveAlert(user.tenantId, id);
  }

  @Get("optimization")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getOptimization(@CurrentUser() user: AuthenticatedCostUser) {
    return this.optimizerService.generateOptimizationReport(user.tenantId);
  }

  @Post("events")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  recordEvent(
    @CurrentUser() user: AuthenticatedCostUser,
    @Body()
    body: {
      modelId?: string;
      feature?: string;
      tokensPrompt?: number;
      tokensCompletion?: number;
      metadata?: Record<string, unknown>;
    },
  ) {
    return this.aggregationService.recordEvent({ tenantId: user.tenantId, ...body });
  }
}
