import { Injectable, NotFoundException } from "@nestjs/common";
import {
  buildBillingTruthContext,
  type BillingTruthContext,
  type BillingModel,
} from "@ordella/shared";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { SubscriptionRepository } from "@/subscription/subscription.repository";

type OrganizationBillingFields = {
  billingModel: BillingModel;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: string | null;
};

@Injectable()
export class BillingContextService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly organizationServiceClient: OrganizationServiceClient,
  ) {}

  async getBillingContext(tenantId: string): Promise<BillingTruthContext> {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }

    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const organization = tenant.organizationId
      ? await this.organizationServiceClient.getOrganizationBillingById(tenant.organizationId)
      : null;

    const billingModel: BillingModel = organization?.billingModel ?? "tenant-level";

    return buildBillingTruthContext({
      tenantId,
      organizationId: tenant.organizationId,
      organizationName: organization?.name ?? null,
      billingModel,
      tenantSubscriptionStatus: subscription?.subscriptionStatus,
      tenantStripeCustomerId: tenant.stripeCustomerId,
      tenantStripeSubscriptionId: subscription?.stripeSubscriptionId,
      organizationSubscriptionStatus: organization?.subscriptionStatus ?? null,
      organizationStripeCustomerId: organization?.stripeCustomerId ?? null,
      organizationStripeSubscriptionId: organization?.stripeSubscriptionId ?? null,
    });
  }
}
