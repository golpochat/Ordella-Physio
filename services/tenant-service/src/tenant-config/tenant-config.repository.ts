import { Injectable } from "@nestjs/common";
import type { Prisma, TenantConfig } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TenantConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantAndNamespace(tenantId: string, namespace: string): Promise<TenantConfig | null> {
    return this.database.tenantConfig.findUnique({
      where: {
        tenantId_namespace: { tenantId, namespace },
      },
    });
  }

  findAllByTenantId(tenantId: string): Promise<TenantConfig[]> {
    return this.database.tenantConfig.findMany({
      where: { tenantId },
      orderBy: { namespace: "asc" },
    });
  }

  upsert(
    tenantId: string,
    namespace: string,
    data: Prisma.InputJsonValue,
    updatedByUserId?: string,
  ): Promise<TenantConfig> {
    return this.database.tenantConfig.upsert({
      where: {
        tenantId_namespace: { tenantId, namespace },
      },
      create: {
        tenant: { connect: { id: tenantId } },
        namespace,
        data,
        updatedByUserId: updatedByUserId ?? null,
      },
      update: {
        data,
        updatedByUserId: updatedByUserId ?? null,
      },
    });
  }
}
