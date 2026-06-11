import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createStaffSchema,
  updateStaffRoleSchema,
  updateTenantSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PERMISSIONS, PermissionGuard, RequirePermissions, RequireRoles, RoleGuard, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { TenantsService } from "@/tenants/tenants.service";
import { TenantService } from "@/tenants/services/tenant.service";
import { TenantOrganizationService } from "@/tenants/services/tenant-organization.service";
import type { CreateTenantPayload, UpdateTenantPayload } from "@/models/Tenant";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";
import { CurrentUser } from "@/tenants/guards/current-user.decorator";
import type { UpdateTenantDto } from "@/tenants/dto/update-tenant.dto";
import type { CreateStaffDto } from "@/tenants/dto/create-staff.dto";
import type { UpdateStaffRoleDto } from "@/tenants/dto/update-staff-role.dto";
import type { UpdateBrandingDto } from "@/branding/dto/update-branding.dto";
import type { UpdatePlanDto } from "@/subscription/dto/update-plan.dto";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";
import { tenantNotFoundError } from "@/utils/tenant-errors";

@Controller("tenants")
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly tenantService: TenantService,
    private readonly tenantOrganizationService: TenantOrganizationService,
  ) {}

  @Get("health")
  health() {
    return { status: "ok", service: "tenant-service" };
  }

  @Post()
  @UseGuards(JwtGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  create(
    @Body() dto: CreateTenantPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantService.createTenant(dto, user, request.correlationId);
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

  @Get("internal/status/:id")
  async resolveTenantStatus(@Param("id") id: string) {
    const status = await this.tenantsService.getTenantStatus(id);
    if (!status) {
      throw tenantNotFoundError();
    }

    return status;
  }

  @Get("internal/organization-tenants/:organizationId")
  listOrganizationTenants(@Param("organizationId") organizationId: string) {
    return this.tenantOrganizationService.listByOrganizationId(organizationId);
  }

  @Get("internal/unassigned-tenants")
  listUnassignedTenants() {
    return this.tenantOrganizationService.listUnassigned();
  }

  @Get("internal/organization-tenant/:tenantId")
  async getOrganizationTenant(@Param("tenantId") tenantId: string) {
    const tenant = await this.tenantOrganizationService.getTenantForOrganizationLink(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    return tenant;
  }

  @Patch("internal/organization-tenant/:tenantId")
  setTenantOrganization(
    @Param("tenantId") tenantId: string,
    @Body() body: { organizationId: string | null },
  ) {
    return this.tenantOrganizationService.setOrganizationId(tenantId, body.organizationId ?? null);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantMatchGuard)
  findById(@Param("id") id: string) {
    return this.tenantsService.findById(id);
  }

  @Post(":id/suspend")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  suspendTenant(
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantService.suspendTenant(id, user);
  }

  @Post(":id/reactivate")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  reactivateTenant(
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedTenantUser,
  ) {
    return this.tenantService.reactivateTenant(id, user);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantMatchGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.TENANT_MANAGE)
  updateTenant(
    @Param("id") id: string,
    @Body() dto: UpdateTenantPayload,
    @CurrentUser() user: AuthenticatedTenantUser,
    @Req() request: OrdellaRequest,
  ) {
    return this.tenantService.updateTenant(id, dto, user, request.correlationId);
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
