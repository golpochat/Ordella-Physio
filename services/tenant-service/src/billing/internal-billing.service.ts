import { Injectable, NotFoundException } from "@nestjs/common";
import type { TenantBillingSyncDto } from "@/billing/dto/tenant-billing-sync.dto";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { SubscriptionService } from "@/subscription/subscription.service";

@Injectable()
export class InternalBillingService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async syncBilling(dto: TenantBillingSyncDto) {
    const tenant = await this.tenantsRepository.findById(dto.tenantId);
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }

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

    return { synced: true, tenantId: dto.tenantId };
  }
}
