import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions } from "@ordella/security";
import { TenantBillingService } from "@/billing/tenant-billing.service";
import type { UpdateTenantBillingSettingsPayload } from "@/models/TenantBillingSettings";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("tenants")
export class TenantBillingController {
  constructor(private readonly tenantBillingService: TenantBillingService) {}

  @Get(":tenantId/billing")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  getBillingSettings(@Param("tenantId") tenantId: string) {
    return this.tenantBillingService.getBillingSettings(tenantId);
  }

  @Put(":tenantId/billing")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  updateBillingSettings(
    @Param("tenantId") tenantId: string,
    @Body() payload: UpdateTenantBillingSettingsPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantBillingService.updateBillingSettings(tenantId, payload, user);
  }
}
