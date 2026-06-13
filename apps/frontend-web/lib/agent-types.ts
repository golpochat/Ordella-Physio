export type AgentToolType = "HTTP" | "INTERNAL_SERVICE" | "DB_QUERY" | "CUSTOM";
export type AgentRunStatus = "RUNNING" | "COMPLETED" | "FAILED";

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

export type AgentToolRecord = {
  id: string;
  tenantId: string;
  name: string;
  type: AgentToolType;
  config: Record<string, unknown>;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

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

export type CreateAgentInput = {
  name: string;
  description?: string;
  modelId: string;
  tools?: string[];
  systemPrompt: string;
  maxSteps?: number;
};

export type CreateToolInput = {
  name: string;
  type: AgentToolType;
  config?: Record<string, unknown>;
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  isActive?: boolean;
};
