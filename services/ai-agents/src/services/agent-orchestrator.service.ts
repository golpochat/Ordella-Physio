import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { AgentRecord } from "@/models/AIAgent";
import type { AgentRunStep } from "@/models/AIAgentRun";
import type { AgentToolRecord } from "@/models/AIAgentTool";
import { AgentsRepository } from "@/repositories/agents.repository";
import { AgentRunLoggerService } from "@/services/agent-run-logger.service";
import { ToolRegistryService } from "@/services/tool-registry.service";

type PlannerDecision = {
  thought: string;
  done: boolean;
  toolName?: string;
  toolInput?: Record<string, unknown>;
  finalAnswer?: string;
};

@Injectable()
export class AgentOrchestratorService {
  private readonly logger = new Logger(AgentOrchestratorService.name);

  constructor(
    private readonly repository: AgentsRepository,
    private readonly toolRegistry: ToolRegistryService,
    private readonly runLogger: AgentRunLoggerService,
  ) {}

  async runAgent(agentId: string, tenantId: string, input: string) {
    const agent = await this.repository.getAgent(agentId, tenantId);
    if (!agent) throw new NotFoundException("Agent not found.");

    const agentRecord = this.repository.mapAgent(agent);
    const run = await this.repository.createRun({ agentId, tenantId, input });
    const runId = run.id;

    const tools = await this.loadAgentTools(agentRecord, tenantId);
    const steps: AgentRunStep[] = [];
    const context: Array<{ role: string; content: string }> = [
      { role: "system", content: agentRecord.systemPrompt },
      { role: "user", content: input },
    ];

    try {
      for (let stepNumber = 1; stepNumber <= agentRecord.maxSteps; stepNumber += 1) {
        const decision = this.planNextStep(agentRecord, tools, input, steps, context);
        let toolOutput: unknown = null;

        if (decision.toolName) {
          const tool = tools.find((t) => t.name === decision.toolName);
          if (tool) {
            toolOutput = await this.toolRegistry.executeTool(tool, tenantId, decision.toolInput ?? {});
            context.push({
              role: "tool",
              content: JSON.stringify({ tool: tool.name, output: toolOutput }),
            });
          } else {
            toolOutput = { error: `Tool ${decision.toolName} not found` };
          }
        }

        const step: AgentRunStep = {
          stepNumber,
          thought: decision.thought,
          toolUsed: decision.toolName ?? null,
          toolInput: decision.toolInput ?? null,
          toolOutput,
        };
        steps.push(step);
        await this.runLogger.logStep(runId, tenantId, step, steps.slice(0, -1));

        if (decision.done) {
          const finalOutput = decision.finalAnswer ?? decision.thought;
          await this.runLogger.finalizeRun(runId, tenantId, "COMPLETED", finalOutput, steps);
          const updated = await this.repository.getRun(runId, tenantId);
          return this.repository.mapRun(updated!);
        }
      }

      const summary = this.summarizeSteps(steps);
      await this.runLogger.finalizeRun(runId, tenantId, "COMPLETED", summary, steps);
      const updated = await this.repository.getRun(runId, tenantId);
      return this.repository.mapRun(updated!);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Agent run failed";
      this.logger.error(message);
      await this.runLogger.finalizeRun(runId, tenantId, "FAILED", message, steps);
      const updated = await this.repository.getRun(runId, tenantId);
      return this.repository.mapRun(updated!);
    }
  }

  private async loadAgentTools(agent: AgentRecord, tenantId: string) {
    if (!agent.tools.length) return [];
    const rows = await this.repository.getToolsByIds(agent.tools, tenantId);
    return rows.map((r) => this.repository.mapTool(r));
  }

  private planNextStep(
    agent: AgentRecord,
    tools: AgentToolRecord[],
    input: string,
    steps: AgentRunStep[],
    context: Array<{ role: string; content: string }>,
  ): PlannerDecision {
    const lower = input.toLowerCase();
    const usedTools = new Set(steps.map((s) => s.toolUsed).filter(Boolean));

    if (steps.length === 0) {
      const tool = this.pickTool(lower, tools, usedTools);
      if (tool) {
        return {
          thought: `Analyzing request and selecting tool ${tool.name}.`,
          done: false,
          toolName: tool.name,
          toolInput: this.buildToolInput(tool, input),
        };
      }
    }

    if (steps.length > 0 && steps.length < agent.maxSteps - 1) {
      const nextTool = this.pickTool(lower, tools, usedTools);
      if (nextTool) {
        return {
          thought: `Continuing with tool ${nextTool.name}.`,
          done: false,
          toolName: nextTool.name,
          toolInput: this.buildToolInput(nextTool, input),
        };
      }
    }

    const toolSummary = steps
      .filter((s) => s.toolUsed)
      .map((s) => `${s.toolUsed}: ${JSON.stringify(s.toolOutput)}`)
      .join("\n");

    return {
      thought: "Synthesizing final answer from tool results and context.",
      done: true,
      finalAnswer: [
        `Agent ${agent.name} completed for model ${agent.modelId}.`,
        `Input: ${input}`,
        toolSummary ? `Tool results:\n${toolSummary}` : "No tools executed.",
        `Context turns: ${context.length}`,
      ].join("\n\n"),
    };
  }

  private pickTool(input: string, tools: AgentToolRecord[], used: Set<string | null>) {
    const priority = [
      { pattern: /patient|search|find/i, name: /patient|search/i },
      { pattern: /invoice|billing|payment/i, name: /invoice|billing/i },
      { pattern: /notify|notification|message/i, name: /notify|notification/i },
      { pattern: /task|todo/i, name: /task/i },
    ];

    for (const rule of priority) {
      if (!rule.pattern.test(input)) continue;
      const match = tools.find((t) => rule.name.test(t.name) && !used.has(t.name));
      if (match) return match;
    }

    return tools.find((t) => !used.has(t.name)) ?? null;
  }

  private buildToolInput(tool: AgentToolRecord, input: string): Record<string, unknown> {
    if (/patient|search/i.test(tool.name)) {
      const query = input.replace(/search|find|patient/gi, "").trim() || "patient";
      return { query };
    }
    if (/invoice|billing/i.test(tool.name)) {
      return { invoiceId: "latest" };
    }
    if (/notify|notification/i.test(tool.name)) {
      return { message: input.slice(0, 500), channel: "in-app" };
    }
    return { request: input };
  }

  private summarizeSteps(steps: AgentRunStep[]) {
    return steps.map((s) => `Step ${s.stepNumber}: ${s.thought}`).join("\n");
  }
}
