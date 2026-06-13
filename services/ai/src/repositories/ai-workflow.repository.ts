import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiWorkflowRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    name: string;
    description: string;
    isActive: boolean;
    dryRun: boolean;
    trigger: Prisma.InputJsonValue;
    conditions: Prisma.InputJsonValue;
    actions: Prisma.InputJsonValue;
  }) {
    return this.database.aIWorkflow.create({ data: input });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIWorkflow.findFirst({
      where: { id, tenantId },
    });
  }

  listByTenant(tenantId: string) {
    return this.database.aIWorkflow.findMany({
      where: { tenantId },
      orderBy: { updatedAt: "desc" },
    });
  }

  update(
    tenantId: string,
    id: string,
    data: Partial<{
      name: string;
      description: string;
      isActive: boolean;
      dryRun: boolean;
      trigger: Prisma.InputJsonValue;
      conditions: Prisma.InputJsonValue;
      actions: Prisma.InputJsonValue;
    }>,
  ) {
    return this.database.aIWorkflow.updateMany({
      where: { id, tenantId },
      data,
    });
  }

  findUpdated(tenantId: string, id: string) {
    return this.findById(tenantId, id);
  }

  setActive(tenantId: string, id: string, isActive: boolean) {
    return this.database.aIWorkflow.updateMany({
      where: { id, tenantId },
      data: { isActive },
    });
  }
}
