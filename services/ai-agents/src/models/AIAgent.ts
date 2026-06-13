import type { AIAgent } from "@/generated/prisma";

export type AgentRecord = {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  modelId: string;
  tools: string[];
  systemPrompt: string;
  maxSteps: number;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export function toAgentRecord(agent: AIAgent): AgentRecord {
  const tools = Array.isArray(agent.tools) ? (agent.tools as string[]) : [];
  return {
    id: agent.id,
    tenantId: agent.tenantId,
    name: agent.name,
    description: agent.description,
    modelId: agent.modelId,
    tools,
    systemPrompt: agent.systemPrompt,
    maxSteps: agent.maxSteps,
    createdByUserId: agent.createdByUserId,
    createdAt: agent.createdAt.toISOString(),
    updatedAt: agent.updatedAt.toISOString(),
  };
}
