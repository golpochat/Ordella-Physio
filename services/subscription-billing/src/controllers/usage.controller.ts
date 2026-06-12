import { Controller, Get, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { UsageService } from "@/services/usage.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

@Controller("usage")
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_READ)
  getUsageSummary(@CurrentUser() user: AuthenticatedSubscriptionUser) {
    return this.usageService.getUsageSummary(user.tenantId);
  }

  @Get("history")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_READ)
  getUsageHistory(@CurrentUser() user: AuthenticatedSubscriptionUser) {
    return this.usageService.getUsageHistory(user.tenantId);
  }
}
