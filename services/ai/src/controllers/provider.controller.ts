import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { ProviderConfigService } from "@/services/provider-config.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("providers")
export class ProviderController {
  constructor(private readonly providerConfigService: ProviderConfigService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MANAGE)
  create(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.providerConfigService.createProvider(user.tenantId, body);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MANAGE)
  list(@CurrentUser() user: AuthenticatedAiUser) {
    return this.providerConfigService.listProviders(user.tenantId);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MANAGE)
  update(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.providerConfigService.updateProvider(user.tenantId, id, body);
  }
}
