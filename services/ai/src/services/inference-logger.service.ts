import { Injectable } from "@nestjs/common";
import { AIRequestLogRepository } from "@/repositories/ai-request-log.repository";

export type InferenceLogInput = {
  tenantId: string;
  provider: string;
  modelName: string;
  prompt: string;
  response: string;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
  taskType?: "TEXT" | "STRUCTURED" | "EMBED";
  success?: boolean;
  metadata?: Record<string, unknown>;
};

@Injectable()
export class InferenceLoggerService {
  constructor(private readonly requestLogRepository: AIRequestLogRepository) {}

  async logInference(input: InferenceLogInput) {
    const promptLength = input.prompt.length;
    const responseLength = input.response.length;
    const bucket = Math.min(3, Math.floor(promptLength / 200));

    const result = await this.requestLogRepository.create({
      tenantId: input.tenantId,
      provider: input.provider,
      modelName: input.modelName,
      prompt: input.prompt,
      response: input.response,
      tokensInput: input.tokensInput,
      tokensOutput: input.tokensOutput,
      latencyMs: input.latencyMs,
      metadata: {
        taskType: input.taskType ?? "TEXT",
        success: input.success ?? true,
        promptLength,
        responseLength,
        inputBucket: bucket,
        outputBucket: Math.min(3, Math.floor(responseLength / 200)),
        ...(input.metadata ?? {}),
      },
    });

    void this.recordObservability(input);
    return result;
  }

  private async recordObservability(input: InferenceLogInput) {
    const observabilityUrl = process.env.AI_OBSERVABILITY_SERVICE_URL ?? "http://localhost:3083";
    try {
      await fetch(`${observabilityUrl}/ai/observability/internal/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": input.tenantId,
          "x-internal-service": "ai-service",
        },
        body: JSON.stringify({
          trace: {
            service: "inference",
            operation: "inference.complete",
            durationMs: input.latencyMs,
            status: input.success === false ? "ERROR" : "OK",
            metadata: { provider: input.provider, modelName: input.modelName },
          },
          log: {
            level: input.success === false ? "ERROR" : "INFO",
            service: "inference",
            message: input.success === false ? "Inference failed" : "Inference logged",
            metadata: { modelName: input.modelName, provider: input.provider },
          },
          metrics: [
            { modelId: input.modelName, metricType: "latency", value: input.latencyMs },
            { modelId: input.modelName, metricType: "token_usage", value: input.tokensInput + input.tokensOutput },
            { modelId: input.modelName, metricType: "error_rate", value: input.success === false ? 1 : 0 },
            { modelId: input.modelName, metricType: "throughput", value: input.tokensOutput },
          ],
        }),
      });
    } catch {
      // Observability is best-effort
    }
  }

  async aggregateStats(tenantId: string, modelName: string) {
    return this.requestLogRepository.aggregateByModelName(tenantId, modelName);
  }
}
