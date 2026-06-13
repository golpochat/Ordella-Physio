import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toAgentRecord } from "@/models/AIAgent";
import { toAgentRunRecord } from "@/models/AIAgentRun";
import { toAgentToolRecord } from "@/models/AIAgentTool";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AgentsRepository {
  constructor(private readonly db: DatabaseService) {}

  createAgent(data: {
    tenantId: string;
    name: string;
    description?: string;
    modelId: string;
    tools: Prisma.InputJsonValue;
    systemPrompt: string;
    maxSteps: number;
    createdByUserId: string;
  }) {
    return this.db.aIAgent.create({ data });
  }

  listAgents(tenantId: string) {
    return this.db.aIAgent.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
  }

  getAgent(id: string, tenantId: string) {
    return this.db.aIAgent.findFirst({ where: { id, tenantId } });
  }

  createTool(data: {
    tenantId: string;
    name: string;
    type: string;
    config?: Prisma.InputJsonValue;
    inputSchema?: Prisma.InputJsonValue;
    outputSchema?: Prisma.InputJsonValue;
    isActive?: boolean;
  }) {
    return this.db.aIAgentTool.create({ data });
  }

  updateTool(id: string, tenantId: string, data: {
    name?: string;
    type?: string;
    config?: Prisma.InputJsonValue;
    inputSchema?: Prisma.InputJsonValue;
    outputSchema?: Prisma.InputJsonValue;
    isActive?: boolean;
  }) {
    return this.db.aIAgentTool.updateMany({ where: { id, tenantId }, data });
  }

  deleteTool(id: string, tenantId: string) {
    return this.db.aIAgentTool.deleteMany({ where: { id, tenantId } });
  }

  listTools(tenantId: string) {
    return this.db.aIAgentTool.findMany({ where: { tenantId }, orderBy: { name: "asc" } });
  }

  getTool(id: string, tenantId: string) {
    return this.db.aIAgentTool.findFirst({ where: { id, tenantId, isActive: true } });
  }

  getToolsByIds(ids: string[], tenantId: string) {
    return this.db.aIAgentTool.findMany({
      where: { tenantId, id: { in: ids }, isActive: true },
    });
  }

  createRun(data: { agentId: string; tenantId: string; input: string }) {
    return this.db.aIAgentRun.create({ data });
  }

  updateRun(id: string, tenantId: string, data: {
    steps?: Prisma.InputJsonValue;
    finalOutput?: string;
    status?: string;
  }) {
    return this.db.aIAgentRun.updateMany({ where: { id, tenantId }, data });
  }

  getRun(id: string, tenantId: string) {
    return this.db.aIAgentRun.findFirst({ where: { id, tenantId } });
  }

  listRuns(agentId: string, tenantId: string) {
    return this.db.aIAgentRun.findMany({
      where: { agentId, tenantId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  mapAgent(row: Awaited<ReturnType<AgentsRepository["createAgent"]>>) {
    return toAgentRecord(row);
  }

  mapTool(row: Awaited<ReturnType<AgentsRepository["createTool"]>>) {
    return toAgentToolRecord(row);
  }

  mapRun(row: Awaited<ReturnType<AgentsRepository["createRun"]>>) {
    return toAgentRunRecord(row);
  }
}
