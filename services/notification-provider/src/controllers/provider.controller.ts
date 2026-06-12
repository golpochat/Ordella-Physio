import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { ProviderConfigService } from "@/services/provider-config.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";

@Controller("providers")
export class ProviderController {
  constructor(private readonly providerConfigService: ProviderConfigService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_PROVIDERS_MANAGE)
  create(@Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedProviderUser) {
    return this.providerConfigService.createProviderConfig(user.tenantId, body);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_PROVIDERS_VIEW)
  list(@CurrentUser() user: AuthenticatedProviderUser) {
    return this.providerConfigService.listProviderConfigs(user.tenantId);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_PROVIDERS_MANAGE)
  update(
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedProviderUser,
  ) {
    return this.providerConfigService.updateProviderConfig(id, user.tenantId, body);
  }
}
