import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import type { CreateLocationPayload, UpdateLocationPayload } from "@/models/Location";
import { LocationsService } from "@/locations/locations.service";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { TenantGuard } from "@ordella/security";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";
import { LocationManageGuard } from "@/locations/guards/location-manage.guard";
import { LocationUpdateManageGuard } from "@/locations/guards/location-update-manage.guard";
import { LocationModifyGuard } from "@/locations/guards/location-modify.guard";

@Controller("tenants/:tenantId/locations")
export class LocationController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationManageGuard)
  createLocation(
    @Param("tenantId") tenantId: string,
    @Body() payload: CreateLocationPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationsService.createLocation(payload, { ...user, tenantId });
  }

  @Get()
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationManageGuard)
  listLocations(
    @Param("tenantId") tenantId: string,
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationsService.listLocations(query, { ...user, tenantId });
  }

  @Get(":locationId")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationManageGuard)
  getLocation(
    @Param("tenantId") tenantId: string,
    @Param("locationId") locationId: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationsService.getLocation(locationId, { ...user, tenantId });
  }

  @Put(":locationId")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationUpdateManageGuard)
  updateLocation(
    @Param("tenantId") tenantId: string,
    @Param("locationId") locationId: string,
    @Body() payload: UpdateLocationPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationsService.updateLocation(locationId, payload, { ...user, tenantId });
  }

  @Post(":locationId/deactivate")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationModifyGuard)
  deactivateLocation(
    @Param("tenantId") tenantId: string,
    @Param("locationId") locationId: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationsService.deactivateLocation(locationId, { ...user, tenantId });
  }

  @Post(":locationId/activate")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard, LocationModifyGuard)
  activateLocation(
    @Param("tenantId") tenantId: string,
    @Param("locationId") locationId: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.locationsService.activateLocation(locationId, { ...user, tenantId });
  }
}
