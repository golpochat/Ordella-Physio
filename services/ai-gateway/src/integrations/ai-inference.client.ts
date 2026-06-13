import { Injectable, Logger } from "@nestjs/common";
import { aiGatewayConfig } from "@/config/ai-gateway.config";

export type InferenceProxyResult = {
  result: unknown;
  tokensPrompt: number;
  tokensCompletion: number;
  modelId?: string;
  latencyMs: number;
  success: boolean;
};

@Injectable()
export class AiInferenceClient {
  private readonly logger = new Logger(AiInferenceClient.name);

  async runInference(body: Record<string, unknown>, tenantId: string) {
    const started = Date.now();
    try {
      const response = await fetch(`${aiGatewayConfig.aiServiceUrl}/ai/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId,
          "x-gateway-bypass": "internal",
        },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) {
        return {
          result: payload,
          tokensPrompt: 0,
          tokensCompletion: 0,
          modelId: String(body.model ?? "unknown"),
          latencyMs: Date.now() - started,
          success: false,
        } satisfies InferenceProxyResult;
      }
      const data = payload as { usage?: { promptTokens?: number; completionTokens?: number }; model?: string };
      return {
        result: payload,
        tokensPrompt: data.usage?.promptTokens ?? 0,
        tokensCompletion: data.usage?.completionTokens ?? 0,
        modelId: data.model ?? String(body.model ?? "unknown"),
        latencyMs: Date.now() - started,
        success: true,
      } satisfies InferenceProxyResult;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Inference failed.";
      this.logger.warn(`Inference proxy error: ${message}`);
      return {
        result: { message },
        tokensPrompt: 0,
        tokensCompletion: 0,
        modelId: String(body.model ?? "unknown"),
        latencyMs: Date.now() - started,
        success: false,
      } satisfies InferenceProxyResult;
    }
  }

  async runEmbeddings(body: Record<string, unknown>, tenantId: string) {
    const started = Date.now();
    try {
      const response = await fetch(`${aiGatewayConfig.aiServiceUrl}/ai/embed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId,
          "x-gateway-bypass": "internal",
        },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) {
        return {
          result: payload,
          tokensPrompt: 0,
          tokensCompletion: 0,
          modelId: String(body.model ?? "embed"),
          latencyMs: Date.now() - started,
          success: false,
        } satisfies InferenceProxyResult;
      }
      const tokens = Math.ceil(String(body.text ?? "").length / 4);
      return {
        result: payload,
        tokensPrompt: tokens,
        tokensCompletion: 0,
        modelId: String(body.model ?? "embed"),
        latencyMs: Date.now() - started,
        success: true,
      } satisfies InferenceProxyResult;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Embedding failed.";
      this.logger.warn(`Embedding proxy error: ${message}`);
      return {
        result: { message },
        tokensPrompt: 0,
        tokensCompletion: 0,
        modelId: String(body.model ?? "embed"),
        latencyMs: Date.now() - started,
        success: false,
      } satisfies InferenceProxyResult;
    }
  }
}
