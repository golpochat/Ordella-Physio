import { Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { subscriptionStatusToDb } from "@/utils/organization-helpers";

export type OrganizationBillingSyncDto = {
  organizationId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?: string;
};

@Injectable()
export class OrganizationBillingService {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  async syncBilling(dto: OrganizationBillingSyncDto) {
    const organization = await this.organizationRepository.findById(dto.organizationId);
    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    const subscriptionStatus = dto.subscriptionStatus
      ? subscriptionStatusToDb(dto.subscriptionStatus)
      : undefined;

    await this.organizationRepository.update(dto.organizationId, {
      ...(dto.stripeCustomerId ? { stripeCustomerId: dto.stripeCustomerId } : {}),
      ...(dto.stripeSubscriptionId !== undefined
        ? { stripeSubscriptionId: dto.stripeSubscriptionId }
        : {}),
      ...(subscriptionStatus !== undefined ? { subscriptionStatus } : {}),
    });

    return { synced: true, organizationId: dto.organizationId };
  }
}
