import type { AIRequestLog as AIRequestLogModel } from "@/generated/prisma";

export type { AIRequestLogModel as AIRequestLogRecord };

export type AIRequestLogResponse = {
  id: string;
  tenantId: string;
  provider: string;
  modelName: string;
  prompt: string;
  response: string;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
  createdAt: string;
};

export function toAIRequestLogResponse(record: AIRequestLogModel): AIRequestLogResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    provider: record.provider,
    modelName: record.modelName,
    prompt: record.prompt,
    response: record.response,
    tokensInput: record.tokensInput,
    tokensOutput: record.tokensOutput,
    latencyMs: record.latencyMs,
    createdAt: record.createdAt.toISOString(),
  };
}
