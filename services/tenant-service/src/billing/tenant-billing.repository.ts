import { Injectable } from "@nestjs/common";
import type { Prisma, TenantBillingSettings } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TenantBillingRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantId(tenantId: string): Promise<TenantBillingSettings | null> {
    return this.database.tenantBillingSettings.findUnique({ where: { tenantId } });
  }

  upsert(
    tenantId: string,
    data: Omit<Prisma.TenantBillingSettingsCreateInput, "tenant">,
  ): Promise<TenantBillingSettings> {
    return this.database.tenantBillingSettings.upsert({
      where: { tenantId },
      create: {
        tenant: { connect: { id: tenantId } },
        ...data,
      },
      update: data,
    });
  }
}
