import { Injectable } from "@nestjs/common";
import type { PaymentIntent, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PaymentIntentsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      PaymentIntent,
      Prisma.PaymentIntentCreateInput,
      Prisma.PaymentIntentUpdateInput
    >(this.database.paymentIntent as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.PaymentIntentCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.PaymentIntentCreateInput);
  }

  findById(tenantId: string, paymentIntentId: string) {
    return this.forTenant(tenantId).findById(paymentIntentId);
  }

  list(tenantId: string, where: Prisma.PaymentIntentWhereInput = {}) {
    return this.database.paymentIntent.findMany({
      where: { ...where, tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  update(tenantId: string, paymentIntentId: string, data: Prisma.PaymentIntentUpdateInput) {
    return this.forTenant(tenantId).update(paymentIntentId, data);
  }
}
