import type { AIAgentTool } from "@/generated/prisma";

export type ToolType = "HTTP" | "INTERNAL_SERVICE" | "DB_QUERY" | "CUSTOM";

export type AgentToolRecord = {
  id: string;
  tenantId: string;
  name: string;
  type: ToolType;
  config: Record<string, unknown>;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

function parseObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function toAgentToolRecord(tool: AIAgentTool): AgentToolRecord {
  return {
    id: tool.id,
    tenantId: tool.tenantId,
    name: tool.name,
    type: tool.type as ToolType,
    config: parseObject(tool.config),
    inputSchema: parseObject(tool.inputSchema),
    outputSchema: parseObject(tool.outputSchema),
    isActive: tool.isActive,
    createdAt: tool.createdAt.toISOString(),
    updatedAt: tool.updatedAt.toISOString(),
  };
}
