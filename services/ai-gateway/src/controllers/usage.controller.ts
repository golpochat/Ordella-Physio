import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { GatewayScope } from "@/models/AIGatewayKey";
import { BudgetService } from "@/services/budget.service";
import { GatewayKeyService } from "@/services/gateway-key.service";
import { RateLimitService } from "@/services/rate-limit.service";
import { UsageTrackingService } from "@/services/usage-tracking.service";
import type { AuthenticatedGatewayUser } from "@/utils/gateway-user";
import { GatewayRepository } from "@/repositories/gateway.repository";

@Controller("gateway")
export class UsageController {
  constructor(
    private readonly usageTrackingService: UsageTrackingService,
    private readonly budgetService: BudgetService,
    private readonly rateLimitService: RateLimitService,
    private readonly gatewayKeyService: GatewayKeyService,
    private readonly repository: GatewayRepository,
  ) {}

  @Get("usage")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getUsageSummary(@CurrentUser() user: AuthenticatedGatewayUser) {
    return this.usageTrackingService.aggregateUsage(user.tenantId);
  }

  @Get("usage/models")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getUsageByModel(@CurrentUser() user: AuthenticatedGatewayUser) {
    return this.usageTrackingService.getUsageByModel(user.tenantId);
  }

  @Get("usage/keys")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getUsageByKey(@CurrentUser() user: AuthenticatedGatewayUser) {
    return this.usageTrackingService.getUsageByKey(user.tenantId);
  }

  @Get("keys")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listKeys(@CurrentUser() user: AuthenticatedGatewayUser) {
    return this.gatewayKeyService.listKeys(user.tenantId);
  }

  @Post("keys")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  createKey(
    @CurrentUser() user: AuthenticatedGatewayUser,
    @Body()
    body: {
      name: string;
      scopes: GatewayScope[];
      rateLimitProfileId?: string;
      budgetProfileId?: string;
    },
  ) {
    return this.gatewayKeyService.createKey(user.tenantId, body);
  }

  @Put("keys/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  updateKey(
    @CurrentUser() user: AuthenticatedGatewayUser,
    @Param("id") id: string,
    @Body()
    body: Partial<{ name: string; scopes: GatewayScope[]; isActive: boolean; rateLimitProfileId: string | null }>,
  ) {
    return this.gatewayKeyService.updateKey(user.tenantId, id, body);
  }

  @Post("keys/:id/revoke")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  revokeKey(@CurrentUser() user: AuthenticatedGatewayUser, @Param("id") id: string) {
    return this.gatewayKeyService.revokeKey(user.tenantId, id);
  }

  @Post("keys/:id/rotate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  rotateKey(@CurrentUser() user: AuthenticatedGatewayUser, @Param("id") id: string) {
    return this.gatewayKeyService.rotateKey(user.tenantId, id);
  }

  @Get("limits/rate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  async listRateLimits(@CurrentUser() user: AuthenticatedGatewayUser) {
    const rows = await this.repository.listRateLimits(user.tenantId);
    return rows.map((row) => this.repository.mapRateLimit(row));
  }

  @Put("limits/rate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  async upsertRateLimit(
    @CurrentUser() user: AuthenticatedGatewayUser,
    @Body()
    body: {
      name: string;
      requestsPerMinute?: number;
      requestsPerHour?: number;
      requestsPerDay?: number;
      tokensPerMinute?: number;
      tokensPerDay?: number;
      burstLimit?: number;
    },
  ) {
    const row = await this.repository.upsertRateLimit(user.tenantId, body);
    return this.repository.mapRateLimit(row);
  }

  @Get("limits/budget")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getBudget(@CurrentUser() user: AuthenticatedGatewayUser) {
    return this.budgetService.ensureBudget(user.tenantId);
  }

  @Put("limits/budget")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  updateBudget(
    @CurrentUser() user: AuthenticatedGatewayUser,
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

  @Get("limits/usage/:keyId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getKeyRateUsage(
    @CurrentUser() user: AuthenticatedGatewayUser,
    @Param("keyId") keyId: string,
  ) {
    return this.rateLimitService.getCurrentUsage(user.tenantId, keyId);
  }
}
