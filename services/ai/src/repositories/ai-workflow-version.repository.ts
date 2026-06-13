import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiWorkflowVersionRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    workflowId: string;
    versionNumber: number;
    label?: string | null;
    definition: Prisma.InputJsonValue;
    createdByUserId: string;
  }) {
    return this.database.aIWorkflowVersion.create({ data: input });
  }

  findByWorkflowAndNumber(tenantId: string, workflowId: string, versionNumber: number) {
    return this.database.aIWorkflowVersion.findFirst({
      where: { tenantId, workflowId, versionNumber },
    });
  }

  listByWorkflow(tenantId: string, workflowId: string) {
    return this.database.aIWorkflowVersion.findMany({
      where: { tenantId, workflowId },
      orderBy: { versionNumber: "desc" },
    });
  }

  getMaxVersionNumber(workflowId: string) {
    return this.database.aIWorkflowVersion.aggregate({
      where: { workflowId },
      _max: { versionNumber: true },
    });
  }

  updateLabel(tenantId: string, workflowId: string, versionNumber: number, label: string | null) {
    return this.database.aIWorkflowVersion.updateMany({
      where: { tenantId, workflowId, versionNumber },
      data: { label },
    });
  }
}
