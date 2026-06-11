import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions } from "@ordella/security";
import { TenantLocalizationService } from "@/localization/tenant-localization.service";
import type { UpdateTenantLocalizationPayload } from "@/models/TenantLocalization";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";
import { tenantNotFoundError } from "@/utils/tenant-errors";

@Controller("tenants")
export class TenantLocalizationController {
  constructor(private readonly tenantLocalizationService: TenantLocalizationService) {}

  @Get("internal/localization/:id")
  async resolveLocalization(@Param("id") id: string) {
    const localization = await this.tenantLocalizationService.getLocalizationForInternal(id);
    if (!localization) {
      throw tenantNotFoundError();
    }

    return localization;
  }

  @Get(":tenantId/localization")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  getLocalization(@Param("tenantId") tenantId: string) {
    return this.tenantLocalizationService.getLocalization(tenantId);
  }

  @Put(":tenantId/localization")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  updateLocalization(
    @Param("tenantId") tenantId: string,
    @Body() payload: UpdateTenantLocalizationPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantLocalizationService.updateLocalization(tenantId, payload, user);
  }
}
