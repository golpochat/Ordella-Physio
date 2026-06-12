import { Controller, Get, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { FeatureGateService } from "@/services/feature-gate.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

@Controller("features")
export class FeatureController {
  constructor(private readonly featureGateService: FeatureGateService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_READ)
  listFeatures(@CurrentUser() user: AuthenticatedSubscriptionUser) {
    return this.featureGateService.listFeaturesForTenant(user.tenantId);
  }
}
