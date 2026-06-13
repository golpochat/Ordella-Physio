import type { AIAgentRun } from "@/generated/prisma";

export type AgentRunStatus = "RUNNING" | "COMPLETED" | "FAILED";

export type AgentRunStep = {
  stepNumber: number;
  thought: string;
  toolUsed: string | null;
  toolInput: Record<string, unknown> | null;
  toolOutput: unknown;
};

export type AgentRunRecord = {
  id: string;
  agentId: string;
  tenantId: string;
  input: string;
  steps: AgentRunStep[];
  finalOutput: string | null;
  status: AgentRunStatus;
  createdAt: string;
  updatedAt: string;
};

function parseSteps(value: unknown): AgentRunStep[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (step): step is AgentRunStep =>
      Boolean(step) &&
      typeof step === "object" &&
      typeof (step as AgentRunStep).stepNumber === "number",
  );
}

export function toAgentRunRecord(run: AIAgentRun): AgentRunRecord {
  return {
    id: run.id,
    agentId: run.agentId,
    tenantId: run.tenantId,
    input: run.input,
    steps: parseSteps(run.steps),
    finalOutput: run.finalOutput,
    status: run.status as AgentRunStatus,
    createdAt: run.createdAt.toISOString(),
    updatedAt: run.updatedAt.toISOString(),
  };
}
