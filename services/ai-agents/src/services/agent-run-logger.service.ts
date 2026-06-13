import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { AgentRunStep } from "@/models/AIAgentRun";
import { AgentsRepository } from "@/repositories/agents.repository";

@Injectable()
export class AgentRunLoggerService {
  private readonly logger = new Logger(AgentRunLoggerService.name);
  private readonly observabilityUrl = process.env.AI_OBSERVABILITY_SERVICE_URL ?? "http://localhost:3083";

  constructor(private readonly repository: AgentsRepository) {}

  async logStep(runId: string, tenantId: string, step: AgentRunStep, existingSteps: AgentRunStep[]) {
    const steps = [...existingSteps, step];
    await this.repository.updateRun(runId, tenantId, {
      steps: steps as unknown as Prisma.InputJsonValue,
    });

    void this.recordObservability(tenantId, runId, step);
    return steps;
  }

  async finalizeRun(
    runId: string,
    tenantId: string,
    status: "COMPLETED" | "FAILED",
    finalOutput: string,
    steps: AgentRunStep[],
  ) {
    await this.repository.updateRun(runId, tenantId, {
      status,
      finalOutput,
      steps: steps as unknown as Prisma.InputJsonValue,
    });

    void this.recordObservability(tenantId, runId, {
      stepNumber: steps.length + 1,
      thought: status === "COMPLETED" ? "Run completed" : "Run failed",
      toolUsed: null,
      toolInput: null,
      toolOutput: { status, finalOutput },
    });
  }

  private async recordObservability(tenantId: string, runId: string, step: AgentRunStep) {
    try {
      await fetch(`${this.observabilityUrl}/ai/observability/internal/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId,
          "x-internal-service": "ai-agents",
        },
        body: JSON.stringify({
          trace: {
            service: "inference",
            operation: "agent.step",
            durationMs: 0,
            status: "OK",
            metadata: { runId, stepNumber: step.stepNumber, toolUsed: step.toolUsed },
          },
          log: {
            level: "INFO",
            service: "inference",
            message: step.thought,
            metadata: { runId, toolUsed: step.toolUsed, toolInput: step.toolInput },
          },
        }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Observability logging failed";
      this.logger.debug(message);
    }
  }
}
