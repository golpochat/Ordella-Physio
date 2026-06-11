import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import { toTenantResponse } from "@/tenants/tenants.mapper";

export type UpdateTenantCommandInput = {
  tenantId: string;
  dto: Prisma.TenantUpdateInput;
  correlationId?: string;
};

@Injectable()
export class UpdateTenantCommand {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly eventPublisher: TenantEventPublisher,
  ) {}

  async execute(input: UpdateTenantCommandInput) {
    const tenant = await this.tenantsRepository.update(input.tenantId, input.dto);

    await this.eventPublisher.publishTenantUpdated(
      {
        tenantId: tenant.id,
        changes: input.dto as Record<string, unknown>,
        updatedAt: tenant.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toTenantResponse(tenant);
  }
}
