import { Injectable } from "@nestjs/common";
import type { Prisma, Refund } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class RefundsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Refund, Prisma.RefundCreateInput, Prisma.RefundUpdateInput>(
      this.database.refund as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.RefundCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.RefundCreateInput);
  }

  findById(tenantId: string, refundId: string) {
    return this.forTenant(tenantId).findById(refundId);
  }

  listByPaymentIntent(tenantId: string, paymentIntentId: string) {
    return this.database.refund.findMany({
      where: { tenantId, paymentIntentId },
      orderBy: { createdAt: "desc" },
    });
  }
}
