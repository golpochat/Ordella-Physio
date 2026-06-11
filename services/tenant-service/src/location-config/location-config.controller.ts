import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { TenantGuard } from "@ordella/security";
import { LocationConfigService } from "@/location-config/location-config.service";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import { LocationManageGuard } from "@/locations/guards/location-manage.guard";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("tenants/:tenantId/locations/:locationId/config")
export class LocationConfigController {
  constructor(private readonly locationConfigService: LocationConfigService) {}

  @Get()
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationManageGuard)
  listNamespaces(
    @Param("locationId") locationId: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationConfigService.listNamespaces(locationId, user);
  }

  @Get(":namespace")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationManageGuard)
  getConfig(
    @Param("locationId") locationId: string,
    @Param("namespace") namespace: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationConfigService.getConfig(locationId, namespace, user);
  }

  @Put(":namespace")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationManageGuard)
  updateConfig(
    @Param("locationId") locationId: string,
    @Param("namespace") namespace: string,
    @Body() body: { data?: unknown },
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationConfigService.updateConfig(
      locationId,
      namespace,
      body?.data ?? body,
      user,
    );
  }
}
