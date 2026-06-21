import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { RequireRoles, RoleGuard } from "@ordella/security";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";
import {
  TenantOnboardingService,
  type UpdateTenantProfileInput,
} from "@/tenants/tenant-onboarding.service";

@Controller("tenants")
export class TenantOnboardingController {
  constructor(private readonly tenantOnboardingService: TenantOnboardingService) {}

  @Get("profile")
  @UseGuards(JwtGuard)
  getProfile(@CurrentUser() user: AuthenticatedTenantUser) {
    return this.tenantOnboardingService.getProfile(user.tenantId);
  }

  @Patch("profile")
  @UseGuards(JwtGuard, RoleGuard)
  @RequireRoles("OWNER", "ADMIN", "SYSTEM")
  updateProfile(
    @CurrentUser() user: AuthenticatedTenantUser,
    @Body() body: UpdateTenantProfileInput,
  ) {
    return this.tenantOnboardingService.updateProfile(user.tenantId, body, user.userId);
  }

  @Get("trial")
  @UseGuards(JwtGuard)
  getTrial(@CurrentUser() user: AuthenticatedTenantUser) {
    return this.tenantOnboardingService.getTrial(user.tenantId);
  }
}
