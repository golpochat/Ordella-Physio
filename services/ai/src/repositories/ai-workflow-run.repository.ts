import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiWorkflowRunRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    trigger: string;
    status: string;
    steps: Prisma.InputJsonValue;
    result?: Prisma.InputJsonValue;
  }) {
    return this.database.aIWorkflowRun.create({ data: input });
  }

  updateResult(id: string, status: string, result: Prisma.InputJsonValue) {
    return this.database.aIWorkflowRun.update({
      where: { id },
      data: { status, result },
    });
  }

  listByTenant(tenantId: string, limit = 50) {
    return this.database.aIWorkflowRun.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
