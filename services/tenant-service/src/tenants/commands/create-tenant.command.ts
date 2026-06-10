import { Injectable } from "@nestjs/common";
import { TenantAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateTenantDto } from "@/tenants/dto/create-tenant.dto";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import { buildDefaultBranding, buildDefaultSubscription, buildDefaultTenantSettings } from "@/utils/tenant-helpers";
import { toTenantResponse } from "@/tenants/tenants.mapper";

export type CreateTenantCommandInput = {
  dto: CreateTenantDto;
  correlationId?: string;
};

@Injectable()
export class CreateTenantCommand {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly eventPublisher: TenantEventPublisher,
  ) {}

  async execute(input: CreateTenantCommandInput) {
    const tenantId = randomString(24);
    const aggregateResult = TenantAggregate.create({
      id: tenantId,
      name: input.dto.name,
      slug: input.dto.slug,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const defaults = buildDefaultTenantSettings();
    const tenant = await this.tenantsRepository.create({
      id: tenantId,
      name: input.dto.name,
      slug: input.dto.slug,
      timezone: input.dto.timezone ?? defaults.timezone,
      currency: input.dto.currency ?? defaults.currency,
      address: input.dto.address,
      phone: input.dto.phone,
      isActive: defaults.isActive,
      branding: { create: buildDefaultBranding() },
      subscription: { create: buildDefaultSubscription() },
    });

    await this.eventPublisher.publishTenantCreated(
      {
        tenantId: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        createdAt: tenant.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toTenantResponse(tenant);
  }
}
