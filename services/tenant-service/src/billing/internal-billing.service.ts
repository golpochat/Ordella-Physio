import { Injectable, NotFoundException } from "@nestjs/common";
import type { TenantBillingSyncDto } from "@/billing/dto/tenant-billing-sync.dto";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { SubscriptionService } from "@/subscription/subscription.service";

@Injectable()
export class InternalBillingService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly organizationServiceClient: OrganizationServiceClient,
  ) {}

  async syncLifecycle(dto: { tenantId: string; status: "ACTIVE" | "SUSPENDED" }) {
    const tenant = await this.tenantsRepository.findById(dto.tenantId);
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }

    await this.tenantsRepository.setStatus(dto.tenantId, dto.status);
    return { synced: true, tenantId: dto.tenantId, status: dto.status };
  }

  async incrementAiNotesUsage(tenantId: string, amount = 1) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }

    const subscription = await this.subscriptionService.incrementAiNotesUsage(tenantId, amount);
    return {
      synced: true,
      tenantId,
      aiNotesUsageCount: subscription.aiNotesUsageCount,
    };
  }

  async syncBilling(dto: TenantBillingSyncDto) {
    const tenant = await this.tenantsRepository.findById(dto.tenantId);
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }

    const organization = tenant.organizationId
      ? await this.organizationServiceClient.getOrganizationBillingById(tenant.organizationId)
      : null;

    const isOrganizationLevel = organization?.billingModel === "organization-level";

    if (!isOrganizationLevel) {
      await this.tenantsRepository.update(dto.tenantId, {
        stripeCustomerId: dto.stripeCustomerId,
      });

      if (dto.stripeSubscriptionId || dto.plan || dto.subscriptionStatus) {
        await this.subscriptionService.syncFromStripe(dto.tenantId, {
          stripeSubscriptionId: dto.stripeSubscriptionId ?? undefined,
          plan: dto.plan,
          subscriptionStatus: dto.subscriptionStatus,
        });
      }
    }

    return { synced: true, tenantId: dto.tenantId, billingEntity: isOrganizationLevel ? "organization" : "tenant" };
  }
}
