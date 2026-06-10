import { Injectable } from "@nestjs/common";
import type { Discount, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class DiscountsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Discount, Prisma.DiscountCreateInput, Prisma.DiscountUpdateInput>(
      this.database.discount as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.DiscountCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.DiscountCreateInput);
  }

  findById(tenantId: string, discountId: string) {
    return this.forTenant(tenantId).findById(discountId);
  }

  list(tenantId: string) {
    return this.database.discount.findMany({
      where: { tenantId },
      orderBy: { name: "asc" },
    });
  }

  update(tenantId: string, discountId: string, data: Prisma.DiscountUpdateInput) {
    return this.forTenant(tenantId).update(discountId, data);
  }
}
