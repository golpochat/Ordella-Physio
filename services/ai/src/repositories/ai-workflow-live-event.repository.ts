import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { WorkflowLiveEventFilters } from "@/models/WorkflowLiveEvent";

@Injectable()
export class AiWorkflowLiveEventRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    workflowId?: string | null;
    workflowName?: string | null;
    runId?: string | null;
    eventType: string;
    payload: Prisma.InputJsonValue;
    durationMs?: number | null;
    status?: string | null;
  }) {
    return this.database.aIWorkflowLiveEvent.create({ data: input });
  }

  listRecent(filters: WorkflowLiveEventFilters & { scopeTenantId?: string; allTenants?: boolean }) {
    const limit = Math.min(filters.limit ?? 200, 200);
    const where: Prisma.AIWorkflowLiveEventWhereInput = {
      ...(filters.allTenants
        ? filters.tenantId
          ? { tenantId: filters.tenantId }
          : {}
        : { tenantId: filters.scopeTenantId }),
      ...(filters.workflowId ? { workflowId: filters.workflowId } : {}),
      ...(filters.eventType ? { eventType: filters.eventType } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.from || filters.to
        ? {
            timestamp: {
              ...(filters.from ? { gte: new Date(filters.from) } : {}),
              ...(filters.to ? { lte: new Date(filters.to) } : {}),
            },
          }
        : {}),
      ...(filters.search
        ? {
            OR: [
              { workflowName: { contains: filters.search, mode: "insensitive" } },
              { eventType: { contains: filters.search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    return this.database.aIWorkflowLiveEvent.findMany({
      where,
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  }

  pruneTenantEvents(tenantId: string, retain = 500) {
    return this.database.$executeRaw`
      DELETE FROM "ai_workflow_live_events"
      WHERE "tenantId" = ${tenantId}
        AND "id" NOT IN (
          SELECT "id"
          FROM "ai_workflow_live_events"
          WHERE "tenantId" = ${tenantId}
          ORDER BY "timestamp" DESC
          LIMIT ${retain}
        )
    `;
  }
}
