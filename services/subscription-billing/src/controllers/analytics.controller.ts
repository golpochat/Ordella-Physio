import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { RevenueAnalyticsService } from "@/services/revenue-analytics.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly revenueAnalyticsService: RevenueAnalyticsService) {}

  @Get("revenue")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.BILLING_ANALYTICS_VIEW)
  getRevenue(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Query("tenantId") tenantId?: string,
  ) {
    const scopedTenantId = user.role === "SYSTEM" ? tenantId : user.tenantId;
    return this.revenueAnalyticsService.getRevenueMetrics(scopedTenantId);
  }

  @Get("revenue/trend")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.BILLING_ANALYTICS_VIEW)
  getRevenueTrend(@Query("months") months?: string) {
    return this.revenueAnalyticsService.getMrrTrend(Number(months ?? 6));
  }
}
