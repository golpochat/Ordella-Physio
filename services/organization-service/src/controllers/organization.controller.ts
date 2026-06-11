import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import type { CreateOrganizationPayload, UpdateOrganizationPayload } from "@/models/Organization";
import { organizationNotFoundError } from "@/utils/organization-errors";
import { OrganizationService } from "@/services/organization.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { OrganizationManageGuard } from "@/guards/organization-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

@Controller("organizations")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "organization-service" };
  }

  @Get()
  @UseGuards(JwtGuard, OrganizationManageGuard)
  list(@Query() query: Record<string, string | string[] | undefined>) {
    return this.organizationService.listOrganizations(query);
  }

  @Post()
  @UseGuards(JwtGuard, OrganizationManageGuard)
  create(
    @Body() payload: CreateOrganizationPayload,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.createOrganization(payload, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  async getById(@Param("id") id: string) {
    const organization = await this.organizationService.getOrganization(id);
    if (!organization) {
      throw organizationNotFoundError();
    }

    return organization;
  }

  @Put(":id")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  update(
    @Param("id") id: string,
    @Body() payload: UpdateOrganizationPayload,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.updateOrganization(id, payload, user);
  }

  @Post(":id/deactivate")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  deactivate(
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.deactivateOrganization(id, user);
  }

  @Post(":id/activate")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  activate(
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.activateOrganization(id, user);
  }

  @Get(":orgId/tenants/unassigned")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  listUnassignedTenants(@Param("orgId") orgId: string) {
    return this.organizationService.listUnassignedOrganizationTenants(orgId);
  }

  @Get(":orgId/tenants")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  listTenants(@Param("orgId") orgId: string) {
    return this.organizationService.listOrganizationTenants(orgId);
  }

  @Post(":orgId/tenants/:tenantId/assign")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  assignTenant(
    @Param("orgId") orgId: string,
    @Param("tenantId") tenantId: string,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.assignTenantToOrganization(orgId, tenantId, user);
  }

  @Post(":orgId/tenants/:tenantId/remove")
  @UseGuards(JwtGuard, OrganizationManageGuard)
  removeTenant(
    @Param("orgId") orgId: string,
    @Param("tenantId") tenantId: string,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.removeTenantFromOrganization(orgId, tenantId, user);
  }
}
