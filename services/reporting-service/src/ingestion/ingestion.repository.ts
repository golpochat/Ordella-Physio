import { Injectable } from "@nestjs/common";
import type { IngestedEvent, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class IngestionRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      IngestedEvent,
      Prisma.IngestedEventCreateInput,
      Prisma.IngestedEventUpdateInput
    >(this.database.ingestedEvent as never, { tenantId });
  }

  create(
    tenantId: string,
    data: Omit<Prisma.IngestedEventCreateInput, "tenantId">,
  ) {
    return this.forTenant(tenantId).create(data as Prisma.IngestedEventCreateInput);
  }

  findByEntity(tenantId: string, entityType: string, entityId: string) {
    return this.database.ingestedEvent.findMany({
      where: { tenantId, entityType, entityId },
      orderBy: { ingestedAt: "desc" },
    });
  }

  findByEventType(tenantId: string, eventType: string, limit = 100) {
    return this.database.ingestedEvent.findMany({
      where: { tenantId, eventType },
      orderBy: { ingestedAt: "desc" },
      take: limit,
    });
  }

  deleteOlderThan(tenantId: string, cutoff: Date) {
    return this.database.ingestedEvent.deleteMany({
      where: { tenantId, ingestedAt: { lt: cutoff } },
    });
  }
}
