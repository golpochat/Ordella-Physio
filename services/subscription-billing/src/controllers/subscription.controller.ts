import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { SubscriptionService } from "@/services/subscription.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_READ)
  getSubscription(@CurrentUser() user: AuthenticatedSubscriptionUser) {
    return this.subscriptionService.getSubscriptionStatus(user.tenantId);
  }

  @Post("subscribe")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  subscribe(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Body() body: Record<string, unknown>,
  ) {
    return this.subscriptionService.subscribeTenant(user.tenantId, body, {
      email: user.email,
      name: user.email,
    });
  }

  @Post("cancel")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  cancel(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Body() body: Record<string, unknown>,
  ) {
    return this.subscriptionService.cancelSubscription(user.tenantId, body);
  }

  @Get("billing-portal")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  billingPortal(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Query("returnUrl") returnUrl?: string,
  ) {
    return this.subscriptionService.getBillingPortalUrl(user.tenantId, returnUrl);
  }

  @Post("upgrade")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  upgrade(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Body() body: Record<string, unknown>,
  ) {
    return this.subscriptionService.upgradeSubscription(user.tenantId, body);
  }

  @Post("downgrade")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  downgrade(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Body() body: Record<string, unknown>,
  ) {
    return this.subscriptionService.downgradeSubscription(user.tenantId, body);
  }

  @Post("update-payment-method")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  updatePaymentMethod(
    @CurrentUser() user: AuthenticatedSubscriptionUser,
    @Body() body: Record<string, unknown>,
  ) {
    const returnUrl = body.returnUrl ? String(body.returnUrl) : undefined;
    return this.subscriptionService.updatePaymentMethod(user.tenantId, returnUrl);
  }
}
