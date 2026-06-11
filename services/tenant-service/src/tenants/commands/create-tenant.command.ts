import { Injectable } from "@nestjs/common";
import { TenantAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import { TenantStatus } from "@/generated/prisma";
import type { CreateTenantDto } from "@/tenants/dto/create-tenant.dto";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { StaffRepository } from "@/staff/staff.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import { TenantDomainRepository } from "@/tenant-domains/tenant-domain.repository";
import { buildDefaultBranding, buildDefaultSubscription, buildDefaultTenantSettings } from "@/utils/tenant-helpers";
import { buildPrimaryDomainName } from "@/utils/tenant-domain.helpers";
import { toTenantResponse } from "@/tenants/tenants.mapper";

export type CreateTenantCommandInput = {
  dto: CreateTenantDto;
  correlationId?: string;
};

@Injectable()
export class CreateTenantCommand {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly staffRepository: StaffRepository,
    private readonly tenantDomainRepository: TenantDomainRepository,
    private readonly eventPublisher: TenantEventPublisher,
  ) {}

  async execute(input: CreateTenantCommandInput) {
    const tenantId = randomString(24);
    const aggregateResult = TenantAggregate.create({
      id: tenantId,
      name: input.dto.name,
      slug: input.dto.code,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const defaults = buildDefaultTenantSettings();
    const tenant = await this.tenantsRepository.create({
      id: tenantId,
      name: input.dto.name,
      code: input.dto.code,
      slug: input.dto.code,
      ownerUserId: input.dto.ownerUserId,
      timezone: input.dto.timezone ?? defaults.timezone,
      currency: input.dto.currency ?? defaults.currency,
      address: input.dto.address,
      phone: input.dto.phone,
      homeRegion: input.dto.homeRegion ?? "eu-west",
      status: TenantStatus.ACTIVE,
      isActive: true,
      branding: { create: buildDefaultBranding() },
      subscription: { create: buildDefaultSubscription() },
    });

    await this.staffRepository.create(tenant.id, {
      userId: input.dto.ownerUserId,
      role: "OWNER",
    });

    await this.tenantDomainRepository.create({
      tenant: { connect: { id: tenant.id } },
      domain: buildPrimaryDomainName(tenant.code),
      type: "PRIMARY",
      verificationToken: "",
      verified: true,
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
