import { Injectable } from "@nestjs/common";
import type { BlockedSlot, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class BlockedSlotsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      BlockedSlot,
      Prisma.BlockedSlotCreateInput,
      Prisma.BlockedSlotUpdateInput
    >(this.database.blockedSlot as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.BlockedSlotCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.BlockedSlotCreateInput);
  }

  findByTherapist(tenantId: string, therapistId: string) {
    return this.forTenant(tenantId).findMany([], { therapistId } as Prisma.BlockedSlotWhereInput);
  }

  findById(tenantId: string, blockedSlotId: string) {
    return this.forTenant(tenantId).findById(blockedSlotId);
  }

  update(tenantId: string, blockedSlotId: string, data: Prisma.BlockedSlotUpdateInput) {
    return this.forTenant(tenantId).update(blockedSlotId, data);
  }
}
