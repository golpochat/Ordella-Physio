import { Injectable, Logger } from "@nestjs/common";
import { aiGatewayConfig } from "@/config/ai-gateway.config";

@Injectable()
export class AiObservabilityClient {
  private readonly logger = new Logger(AiObservabilityClient.name);
  private readonly observabilityServiceUrl =
    process.env.AI_OBSERVABILITY_SERVICE_URL ?? aiGatewayConfig.aiObservabilityServiceUrl ?? "http://localhost:3083";

  private headers(tenantId: string) {
    return {
      "Content-Type": "application/json",
      "x-tenant-id": tenantId,
      "x-internal-service": "ai-gateway",
    };
  }

  async startSpan(tenantId: string, operation: string, metadata?: Record<string, unknown>) {
    try {
      const response = await fetch(`${this.observabilityServiceUrl}/ai/observability/internal/span/start`, {
        method: "POST",
        headers: this.headers(tenantId),
        body: JSON.stringify({ service: "gateway", operation, metadata }),
      });
      if (!response.ok) return null;
      return response.json() as Promise<{ traceId: string; spanId: string }>;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Span start failed";
      this.logger.debug(`Observability span start unavailable: ${message}`);
      return null;
    }
  }

  async endSpan(
    tenantId: string,
    spanId: string,
    status: "OK" | "ERROR",
    metadata?: Record<string, unknown>,
  ) {
    try {
      await fetch(`${this.observabilityServiceUrl}/ai/observability/internal/span/end`, {
        method: "POST",
        headers: this.headers(tenantId),
        body: JSON.stringify({ spanId, status, metadata }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Span end failed";
      this.logger.debug(`Observability span end unavailable: ${message}`);
    }
  }

  async recordBatch(
    tenantId: string,
    payload: {
      trace?: {
        traceId?: string;
        service: "gateway" | "inference" | "training" | "deployment" | "dataset";
        operation: string;
        durationMs: number;
        status?: "OK" | "ERROR";
        metadata?: Record<string, unknown>;
      };
      log?: {
        level: "INFO" | "WARN" | "ERROR";
        service: "gateway" | "inference" | "training" | "deployment" | "dataset";
        message: string;
        metadata?: Record<string, unknown>;
      };
      metrics?: Array<{
        modelId?: string;
        region?: string;
        metricType: "latency" | "error_rate" | "throughput" | "token_usage";
        value: number;
      }>;
    },
  ) {
    try {
      await fetch(`${this.observabilityServiceUrl}/ai/observability/internal/batch`, {
        method: "POST",
        headers: this.headers(tenantId),
        body: JSON.stringify(payload),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Observability batch failed";
      this.logger.debug(`Observability batch unavailable: ${message}`);
    }
  }
}
