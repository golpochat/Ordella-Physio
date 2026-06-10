import { Injectable } from "@nestjs/common";
import type { Payout, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PayoutsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Payout, Prisma.PayoutCreateInput, Prisma.PayoutUpdateInput>(
      this.database.payout as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.PayoutCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.PayoutCreateInput);
  }

  findById(tenantId: string, payoutId: string) {
    return this.forTenant(tenantId).findById(payoutId);
  }

  list(tenantId: string, providerId?: string) {
    return this.database.payout.findMany({
      where: { tenantId, ...(providerId ? { providerId } : {}) },
      orderBy: { createdAt: "desc" },
    });
  }
}
