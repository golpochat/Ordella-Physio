import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiMemoryRepository {
  constructor(private readonly database: DatabaseService) {}

  upsert(input: {
    tenantId: string;
    memoryKey: string;
    value: Prisma.InputJsonValue;
    entityType?: string;
    entityId?: string;
  }) {
    return this.database.aIMemory.upsert({
      where: {
        tenantId_memoryKey: {
          tenantId: input.tenantId,
          memoryKey: input.memoryKey,
        },
      },
      create: {
        tenantId: input.tenantId,
        memoryKey: input.memoryKey,
        value: input.value,
        entityType: input.entityType,
        entityId: input.entityId,
      },
      update: {
        value: input.value,
        entityType: input.entityType,
        entityId: input.entityId,
      },
    });
  }

  findByKey(tenantId: string, memoryKey: string) {
    return this.database.aIMemory.findUnique({
      where: { tenantId_memoryKey: { tenantId, memoryKey } },
    });
  }

  listByTenant(tenantId: string, limit = 50) {
    return this.database.aIMemory.findMany({
      where: { tenantId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
  }

  listByEntity(tenantId: string, entityType: string, entityId: string, limit = 20) {
    return this.database.aIMemory.findMany({
      where: { tenantId, entityType, entityId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
  }

  deleteByTenant(tenantId: string) {
    return this.database.aIMemory.deleteMany({ where: { tenantId } });
  }
}
