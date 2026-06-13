import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { AgentToolRecord } from "@/models/AIAgentTool";
import { AgentsRepository } from "@/repositories/agents.repository";

@Injectable()
export class ToolRegistryService {
  private readonly logger = new Logger(ToolRegistryService.name);

  constructor(private readonly repository: AgentsRepository) {}

  async registerTool(tenantId: string, input: {
    name: string;
    type: AgentToolRecord["type"];
    config?: Record<string, unknown>;
    inputSchema?: Record<string, unknown>;
    outputSchema?: Record<string, unknown>;
    isActive?: boolean;
  }) {
    const row = await this.repository.createTool({
      tenantId,
      name: input.name,
      type: input.type,
      config: (input.config ?? {}) as Prisma.InputJsonValue,
      inputSchema: (input.inputSchema ?? {}) as Prisma.InputJsonValue,
      outputSchema: (input.outputSchema ?? {}) as Prisma.InputJsonValue,
      isActive: input.isActive ?? true,
    });
    return this.repository.mapTool(row);
  }

  async updateTool(tenantId: string, toolId: string, input: {
    name?: string;
    type?: AgentToolRecord["type"];
    config?: Record<string, unknown>;
    inputSchema?: Record<string, unknown>;
    outputSchema?: Record<string, unknown>;
    isActive?: boolean;
  }) {
    await this.repository.updateTool(toolId, tenantId, {
      ...input,
      config: input.config as Prisma.InputJsonValue | undefined,
      inputSchema: input.inputSchema as Prisma.InputJsonValue | undefined,
      outputSchema: input.outputSchema as Prisma.InputJsonValue | undefined,
    });
    const tool = await this.repository.getTool(toolId, tenantId);
    if (!tool) throw new Error("Tool not found.");
    return this.repository.mapTool(tool);
  }

  async listTools(tenantId: string) {
    const rows = await this.repository.listTools(tenantId);
    return rows.map((r) => this.repository.mapTool(r));
  }

  async getToolConfig(toolId: string, tenantId: string) {
    const tool = await this.repository.getTool(toolId, tenantId);
    if (!tool) throw new Error("Tool not found.");
    return this.repository.mapTool(tool);
  }

  async executeTool(tool: AgentToolRecord, tenantId: string, input: Record<string, unknown>) {
    switch (tool.type) {
      case "HTTP":
        return this.executeHttp(tool, input);
      case "INTERNAL_SERVICE":
        return this.executeInternalService(tool, tenantId, input);
      case "DB_QUERY":
        return { rows: [], note: "DB_QUERY tools return read-only snapshots in this release.", input };
      case "CUSTOM":
      default:
        return { echoed: input, tool: tool.name };
    }
  }

  private async executeHttp(tool: AgentToolRecord, input: Record<string, unknown>) {
    const url = String(tool.config.url ?? "");
    const method = String(tool.config.method ?? "POST").toUpperCase();
    if (!url) return { error: "HTTP tool missing config.url" };

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...(tool.config.headers as Record<string, string> ?? {}) },
      body: method === "GET" ? undefined : JSON.stringify(input),
    });

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { status: response.status, body: text };
    }
  }

  private async executeInternalService(
    tool: AgentToolRecord,
    tenantId: string,
    input: Record<string, unknown>,
  ) {
    const serviceUrl = String(tool.config.serviceUrl ?? "");
    const path = String(tool.config.path ?? "");
    if (!serviceUrl || !path) return { error: "INTERNAL_SERVICE tool missing serviceUrl or path" };

    const response = await fetch(`${serviceUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": tenantId,
        "x-internal-service": "ai-agents",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      this.logger.debug(`Internal tool ${tool.name} failed: ${response.status}`);
      return { error: `Service call failed (${response.status})` };
    }

    return response.json();
  }
}
