import { Injectable } from "@nestjs/common";
import type { LedgerEntry, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class LedgerRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      LedgerEntry,
      Prisma.LedgerEntryCreateInput,
      Prisma.LedgerEntryUpdateInput
    >(this.database.ledgerEntry as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.LedgerEntryCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.LedgerEntryCreateInput);
  }

  findById(tenantId: string, ledgerEntryId: string) {
    return this.forTenant(tenantId).findById(ledgerEntryId);
  }

  list(tenantId: string, where: Prisma.LedgerEntryWhereInput = {}) {
    return this.database.ledgerEntry.findMany({
      where: { ...where, tenantId },
      orderBy: { createdAt: "desc" },
    });
  }
}
