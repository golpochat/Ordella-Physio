import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions } from "@ordella/security";
import { TenantConfigService } from "@/tenant-config/tenant-config.service";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("tenants")
export class TenantConfigController {
  constructor(private readonly tenantConfigService: TenantConfigService) {}

  @Get(":tenantId/config")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  listNamespaces(@Param("tenantId") tenantId: string) {
    return this.tenantConfigService.listNamespaces(tenantId);
  }

  @Get(":tenantId/config/:namespace")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  getConfig(@Param("tenantId") tenantId: string, @Param("namespace") namespace: string) {
    return this.tenantConfigService.getConfig(tenantId, namespace);
  }

  @Put(":tenantId/config/:namespace")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  updateConfig(
    @Param("tenantId") tenantId: string,
    @Param("namespace") namespace: string,
    @Body() body: { data?: unknown },
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantConfigService.updateConfig(tenantId, namespace, body?.data ?? body, user);
  }
}
