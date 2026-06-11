import { Injectable } from "@nestjs/common";
import type { Prisma, TenantLocalization } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TenantLocalizationRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantId(tenantId: string): Promise<TenantLocalization | null> {
    return this.database.tenantLocalization.findUnique({ where: { tenantId } });
  }

  create(
    tenantId: string,
    data: Omit<Prisma.TenantLocalizationCreateInput, "tenant">,
  ): Promise<TenantLocalization> {
    return this.database.tenantLocalization.create({
      data: {
        tenant: { connect: { id: tenantId } },
        ...data,
      },
    });
  }

  upsert(
    tenantId: string,
    data: Omit<Prisma.TenantLocalizationCreateInput, "tenant">,
  ): Promise<TenantLocalization> {
    return this.database.tenantLocalization.upsert({
      where: { tenantId },
      create: {
        tenant: { connect: { id: tenantId } },
        ...data,
      },
      update: data,
    });
  }
}
