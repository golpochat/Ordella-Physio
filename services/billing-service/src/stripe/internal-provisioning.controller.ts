import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import {
  isProvisioningFailStage,
  normalizeProvisioningFailStage,
  provisioningFailureMessage,
  type ProvisioningFailStage,
} from "@ordella/shared";
import { StripeBillingService } from "@/stripe/stripe-billing.service";

type ProvisionTenantBody = {
  tenantId: string;
  name: string;
  slug?: string;
};

type RollbackBody = {
  tenantId?: string;
  organizationId?: string;
  stripeCustomerId?: string;
  billingEntity?: "tenant" | "organization";
};

@Controller("billing/internal")
export class InternalProvisioningController {
  constructor(private readonly stripeBillingService: StripeBillingService) {}

  @Post("provision-tenant")
  provisionTenant(
    @Headers("x-internal-service") serviceName: string | undefined,
    @Headers("x-provisioning-fail-at") failAtHeader: string | undefined,
    @Body() body: ProvisionTenantBody,
  ) {
    if (serviceName !== "tenant-service") {
      throw new UnauthorizedException("Internal service authorization required");
    }

    this.throwIfInjectedFailure("billing", failAtHeader);

    if (!body.tenantId?.trim() || !body.name?.trim()) {
      throw new NotFoundException("tenantId and name are required");
    }

    return this.stripeBillingService.provisionTenantBillingSynchronously({
      tenantId: body.tenantId.trim(),
      name: body.name.trim(),
      slug: body.slug?.trim() || body.name.trim(),
    });
  }

  @Delete("provisioning-rollback")
  rollbackProvisioning(
    @Headers("x-internal-service") serviceName: string | undefined,
    @Body() body: RollbackBody,
  ) {
    if (serviceName !== "tenant-service") {
      throw new UnauthorizedException("Internal service authorization required");
    }

    return this.stripeBillingService.rollbackProvisioningBilling(body);
  }

  @Get("provisioning-status/:tenantId")
  getProvisioningStatus(@Param("tenantId") tenantId: string) {
    return this.stripeBillingService.getProvisioningBillingStatus(tenantId);
  }

  private throwIfInjectedFailure(stage: ProvisioningFailStage, failAtHeader?: string) {
    const failAt = normalizeProvisioningFailStage(failAtHeader);
    if (isProvisioningFailStage(stage, failAt)) {
      throw new Error(provisioningFailureMessage(stage));
    }
  }
}
