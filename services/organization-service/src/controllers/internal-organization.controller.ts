import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common";
import {
  provisioningFailureMessage,
  PROVISIONING_FAIL_HEADER,
  isProvisioningFailStage,
  resolveProvisioningFailStage,
} from "@ordella/shared";
import {
  upsertOrganizationSsoConfigSchema,
  UseZodValidation,
} from "@ordella/validation";
import type { UpsertOrganizationSsoConfigInput } from "@ordella/validation";import type { CreateOrganizationPayload } from "@/models/Organization";
import { organizationNotFoundError } from "@/utils/organization-errors";
import { OrganizationService } from "@/services/organization.service";
import { OrganizationBillingService, type OrganizationBillingSyncDto } from "@/services/organization-billing.service";
import { OrganizationSsoService } from "@/services/organization-sso.service";

@Controller("organizations/internal")
export class InternalOrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly organizationBillingService: OrganizationBillingService,
    private readonly organizationSsoService: OrganizationSsoService,
  ) {}

  @Post("create")
  create(
    @Body() payload: CreateOrganizationPayload,
    @Headers(PROVISIONING_FAIL_HEADER) failAtHeader?: string,
  ) {
    const failAt = resolveProvisioningFailStage({ headerValue: failAtHeader });
    if (isProvisioningFailStage("org", failAt)) {
      throw new InternalServerErrorException(provisioningFailureMessage("org"));
    }

    return this.organizationService.createOrganizationInternal(payload);
  }

  @Delete(":id/provisioning-rollback")
  rollback(@Param("id") id: string) {
    return this.organizationService.rollbackProvisioningOrganization(id);
  }

  @Post("billing-sync")
  syncBilling(@Body() payload: OrganizationBillingSyncDto) {
    return this.organizationBillingService.syncBilling(payload);
  }

  @Get("tenants/:tenantId/sso")
  getSsoByTenant(@Param("tenantId") tenantId: string) {
    return this.organizationSsoService.getInternalConfigForTenant(tenantId);
  }

  @Post(":organizationId/sso")
  @UseZodValidation(upsertOrganizationSsoConfigSchema)
  upsertSsoInternal(
    @Param("organizationId") organizationId: string,
    @Body() dto: UpsertOrganizationSsoConfigInput,
  ) {
    return this.organizationSsoService.upsertConfig(organizationId, dto);
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

  @Get(":organizationId/sso")
  getSsoByOrganization(@Param("organizationId") organizationId: string) {
    return this.organizationSsoService.getConfigForOrganization(organizationId, {
      includeSecrets: true,
    });
  }
}
