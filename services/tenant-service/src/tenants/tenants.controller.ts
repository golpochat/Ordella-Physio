import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createLocationSchema,
  createStaffSchema,
  createTenantSchema,
  updateLocationSchema,
  updateStaffRoleSchema,
  updateTenantSchema,
  UseZodValidation,
} from "@ordella/validation";
import { RequireRoles, RoleGuard, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { TenantsService } from "@/tenants/tenants.service";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { CreateTenantDto } from "@/tenants/dto/create-tenant.dto";
import type { UpdateTenantDto } from "@/tenants/dto/update-tenant.dto";
import type { CreateLocationDto } from "@/tenants/dto/create-location.dto";
import type { UpdateLocationDto } from "@/tenants/dto/update-location.dto";
import type { CreateStaffDto } from "@/tenants/dto/create-staff.dto";
import type { UpdateStaffRoleDto } from "@/tenants/dto/update-staff-role.dto";
import type { UpdateBrandingDto } from "@/branding/dto/update-branding.dto";
import type { UpdatePlanDto } from "@/subscription/dto/update-plan.dto";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Controller("tenants")
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "tenant-service" };
  }

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @RequireRoles("SYSTEM", "OWNER", "ADMIN")
  @UseZodValidation(createTenantSchema)
  create(@Body() dto: CreateTenantDto, @Req() request: OrdellaRequest) {
    return this.tenantsService.create(dto, request.correlationId);
  }

  @Get("directory")
  directory(@Query("limit") limit?: string) {
    const parsedLimit = limit ? Number(limit) : 100;
    const safeLimit =
      Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 200) : 100;

    return this.tenantsService.findDirectory({ limit: safeLimit });
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query("page") page?: string, @Query("limit") limit?: string) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;
    const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const safeLimit =
      Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 200) : 20;

    return this.tenantsService.findAll({
      page: safePage,
      limit: safeLimit,
    });
  }

  @Get("internal/home-region/:id")
  resolveHomeRegion(@Param("id") id: string) {
    return this.tenantsService.getHomeRegion(id);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantMatchGuard)
  findById(@Param("id") id: string) {
    return this.tenantsService.findById(id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("SYSTEM", "OWNER", "ADMIN")
  @UseZodValidation(updateTenantSchema)
  update(
    @Param("id") id: string,
    @Body() dto: UpdateTenantDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantsService.update(id, dto, request.correlationId);
  }

  @Patch(":id/activate")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard)
  @RequireRoles("OWNER", "ADMIN")
  activate(@Param("id") id: string) {
    return this.tenantsService.activate(id);
  }

  @Patch(":id/deactivate")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard)
  @RequireRoles("OWNER", "ADMIN")
  deactivate(@Param("id") id: string) {
    return this.tenantsService.deactivate(id);
  }

  @Post(":tenantId/locations")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  @UseZodValidation(createLocationSchema)
  addLocation(
    @Param("tenantId") tenantId: string,
    @Body() dto: CreateLocationDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantsService.addLocation(tenantId, dto, request.correlationId);
  }

  @Get(":tenantId/locations")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard)
  listLocations(@Param("tenantId") tenantId: string) {
    return this.tenantsService.listLocations(tenantId);
  }

  @Patch(":tenantId/locations/:locationId")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  @UseZodValidation(updateLocationSchema)
  updateLocation(
    @Param("tenantId") tenantId: string,
    @Param("locationId") locationId: string,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.tenantsService.updateLocation(tenantId, locationId, dto);
  }

  @Delete(":tenantId/locations/:locationId")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  archiveLocation(@Param("tenantId") tenantId: string, @Param("locationId") locationId: string) {
    return this.tenantsService.archiveLocation(tenantId, locationId);
  }

  @Post(":tenantId/staff")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  @UseZodValidation(createStaffSchema)
  addStaff(
    @Param("tenantId") tenantId: string,
    @Body() dto: CreateStaffDto,
    @CurrentUser() user: AuthenticatedTenantUser,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantsService.addStaff(tenantId, dto, user.role, request.correlationId);
  }

  @Get(":tenantId/staff")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard)
  listStaff(@Param("tenantId") tenantId: string) {
    return this.tenantsService.listStaff(tenantId);
  }

  @Patch(":tenantId/staff/:staffId")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  @UseZodValidation(updateStaffRoleSchema)
  updateStaffRole(
    @Param("tenantId") tenantId: string,
    @Param("staffId") staffId: string,
    @Body() dto: UpdateStaffRoleDto,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantsService.updateStaffRole(tenantId, staffId, dto, user.role);
  }

  @Delete(":tenantId/staff/:staffId")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  removeStaff(
    @Param("tenantId") tenantId: string,
    @Param("staffId") staffId: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantsService.removeStaff(tenantId, staffId, user.role);
  }

  @Get(":tenantId/branding")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard)
  getBranding(@Param("tenantId") tenantId: string) {
    return this.tenantsService.getBranding(tenantId);
  }

  @Patch(":tenantId/branding")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  updateBranding(@Param("tenantId") tenantId: string, @Body() dto: UpdateBrandingDto) {
    return this.tenantsService.updateBranding(tenantId, dto);
  }

  @Get(":tenantId/subscription")
  @UseGuards(JwtGuard, TenantMatchGuard, TenantGuard)
  getSubscription(@Param("tenantId") tenantId: string) {
    return this.tenantsService.getSubscription(tenantId);
  }

  @Patch(":tenantId/subscription")
  @UseGuards(JwtGuard, TenantMatchGuard, RoleGuard, TenantGuard)
  @RequireRoles("OWNER", "ADMIN")
  updateSubscription(
    @Param("tenantId") tenantId: string,
    @Body() dto: UpdatePlanDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantsService.updateSubscription(tenantId, dto, request.correlationId);
  }
}
