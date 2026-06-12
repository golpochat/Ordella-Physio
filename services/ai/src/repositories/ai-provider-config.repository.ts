import { Injectable } from "@nestjs/common";
import type { AIProviderType, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AIProviderConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIProviderConfigCreateInput) {
    return this.database.aIProviderConfig.create({ data });
  }

  findById(id: string) {
    return this.database.aIProviderConfig.findUnique({ where: { id } });
  }

  findByIdForTenant(id: string, tenantId: string) {
    return this.database.aIProviderConfig.findFirst({ where: { id, tenantId } });
  }

  listByTenant(tenantId: string) {
    return this.database.aIProviderConfig.findMany({
      where: { tenantId },
      orderBy: [{ priority: "asc" }, { createdAt: "asc" }],
    });
  }

  listActiveByTenant(tenantId: string) {
    return this.database.aIProviderConfig.findMany({
      where: { tenantId, isActive: true },
      orderBy: [{ priority: "asc" }, { createdAt: "asc" }],
    });
  }

  update(id: string, data: Prisma.AIProviderConfigUpdateInput) {
    return this.database.aIProviderConfig.update({ where: { id }, data });
  }
}
