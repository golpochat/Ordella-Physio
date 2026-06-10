import { Injectable } from "@nestjs/common";
import type { Prisma, TaxRate } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TaxRatesRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<TaxRate, Prisma.TaxRateCreateInput, Prisma.TaxRateUpdateInput>(
      this.database.taxRate as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.TaxRateCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.TaxRateCreateInput);
  }

  findById(tenantId: string, taxRateId: string) {
    return this.forTenant(tenantId).findById(taxRateId);
  }

  list(tenantId: string) {
    return this.database.taxRate.findMany({
      where: { tenantId },
      orderBy: { name: "asc" },
    });
  }

  update(tenantId: string, taxRateId: string, data: Prisma.TaxRateUpdateInput) {
    return this.forTenant(tenantId).update(taxRateId, data);
  }
}
