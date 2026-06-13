import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

type RunListFilters = {
  workflowId?: string;
  status?: "SUCCESS" | "FAILED" | "RUNNING";
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
};

function mapStatusFilter(status?: RunListFilters["status"]) {
  if (!status) {
    return undefined;
  }
  if (status === "SUCCESS") {
    return "COMPLETED";
  }
  return status;
}

@Injectable()
export class AiWorkflowRunRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    workflowId?: string;
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

  listByWorkflow(tenantId: string, workflowId: string, limit = 50) {
    return this.database.aIWorkflowRun.findMany({
      where: { tenantId, workflowId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async findLatestByWorkflowIds(tenantId: string, workflowIds: string[]) {
    if (!workflowIds.length) {
      return [];
    }

    const runs = await this.database.aIWorkflowRun.findMany({
      where: {
        tenantId,
        workflowId: { in: workflowIds },
      },
      orderBy: { createdAt: "desc" },
      take: Math.min(workflowIds.length * 5, 200),
    });

    const latestByWorkflowId = new Map<string, (typeof runs)[number]>();
    for (const run of runs) {
      if (!run.workflowId || latestByWorkflowId.has(run.workflowId)) {
        continue;
      }
      latestByWorkflowId.set(run.workflowId, run);
    }

    return [...latestByWorkflowId.values()];
  }

  async listPaginated(tenantId: string, filters: RunListFilters = {}) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;
    const mappedStatus = mapStatusFilter(filters.status);

    const where: Prisma.AIWorkflowRunWhereInput = {
      tenantId,
      ...(filters.workflowId ? { workflowId: filters.workflowId } : {}),
      ...(mappedStatus ? { status: mappedStatus } : {}),
      ...(filters.from || filters.to
        ? {
            createdAt: {
              ...(filters.from ? { gte: new Date(filters.from) } : {}),
              ...(filters.to ? { lte: new Date(filters.to) } : {}),
            },
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.database.aIWorkflowRun.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.database.aIWorkflowRun.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }
}
