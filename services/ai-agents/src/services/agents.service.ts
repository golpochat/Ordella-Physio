import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { AgentsRepository } from "@/repositories/agents.repository";

@Injectable()
export class AgentsService {
  constructor(private readonly repository: AgentsRepository) {}

  async createAgent(tenantId: string, userId: string, input: {
    name: string;
    description?: string;
    modelId: string;
    tools?: string[];
    systemPrompt: string;
    maxSteps?: number;
  }) {
    const row = await this.repository.createAgent({
      tenantId,
      name: input.name,
      description: input.description,
      modelId: input.modelId,
      tools: (input.tools ?? []) as Prisma.InputJsonValue,
      systemPrompt: input.systemPrompt,
      maxSteps: input.maxSteps ?? 5,
      createdByUserId: userId,
    });
    return this.repository.mapAgent(row);
  }

  async listAgents(tenantId: string) {
    const rows = await this.repository.listAgents(tenantId);
    return rows.map((r) => this.repository.mapAgent(r));
  }

  async getAgent(id: string, tenantId: string) {
    const row = await this.repository.getAgent(id, tenantId);
    if (!row) throw new NotFoundException("Agent not found.");
    return this.repository.mapAgent(row);
  }

  async listRuns(agentId: string, tenantId: string) {
    const rows = await this.repository.listRuns(agentId, tenantId);
    return rows.map((r) => this.repository.mapRun(r));
  }
}
