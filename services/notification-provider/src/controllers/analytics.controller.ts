import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { AnalyticsService } from "@/services/analytics.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_ANALYTICS_VIEW)
  getStats(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedProviderUser,
  ) {
    return this.analyticsService.getStats(query, user);
  }
}
