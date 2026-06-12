import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { SubscriptionService } from "@/services/subscription.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

@Controller("billing-portal")
export class BillingPortalController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  getPortal(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Query("returnUrl") returnUrl?: string,
  ) {
    return this.subscriptionService.getBillingPortalUrl(user.tenantId, returnUrl);
  }
}
