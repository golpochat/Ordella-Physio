import { Injectable } from "@nestjs/common";
import type { OrganizationConfig, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class OrganizationConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  findByOrganizationAndNamespace(
    organizationId: string,
    namespace: string,
  ): Promise<OrganizationConfig | null> {
    return this.database.organizationConfig.findUnique({
      where: {
        organizationId_namespace: { organizationId, namespace },
      },
    });
  }

  findAllByOrganizationId(organizationId: string): Promise<OrganizationConfig[]> {
    return this.database.organizationConfig.findMany({
      where: { organizationId },
      orderBy: { namespace: "asc" },
    });
  }

  upsert(
    organizationId: string,
    namespace: string,
    data: Prisma.InputJsonValue,
    updatedByUserId?: string,
  ): Promise<OrganizationConfig> {
    return this.database.organizationConfig.upsert({
      where: {
        organizationId_namespace: { organizationId, namespace },
      },
      create: {
        organization: { connect: { id: organizationId } },
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
