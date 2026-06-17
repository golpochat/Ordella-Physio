import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import type { CreateOrganizationPayload } from "@/models/Organization";
import { organizationNotFoundError } from "@/utils/organization-errors";
import { OrganizationService } from "@/services/organization.service";

@Controller("organizations/internal")
export class InternalOrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post("create")
  create(@Body() payload: CreateOrganizationPayload) {
    return this.organizationService.createOrganizationInternal(payload);
  }

  @Delete(":id/provisioning-rollback")
  rollback(@Param("id") id: string) {
    return this.organizationService.rollbackProvisioningOrganization(id);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    const organization = await this.organizationService.getOrganization(id);
    if (!organization) {
      throw organizationNotFoundError();
    }

    return organization;
  }

  @Post(":orgId/tenants/:tenantId/link")
  linkTenant(@Param("orgId") orgId: string, @Param("tenantId") tenantId: string) {
    return this.organizationService.linkTenantInternal(orgId, tenantId);
  }

  @Post(":orgId/tenants/:tenantId/unlink")
  unlinkTenant(@Param("orgId") orgId: string, @Param("tenantId") tenantId: string) {
    return this.organizationService.unlinkTenantInternal(orgId, tenantId);
  }
}
