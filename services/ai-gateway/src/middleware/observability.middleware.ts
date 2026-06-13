import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import { AiObservabilityClient } from "@/integrations/ai-observability.client";
import type { GatewayRequest } from "@/middleware/gateway-auth.middleware";

export type ObservabilityContext = {
  traceId: string;
  spanId: string;
  startedAt: number;
};

@Injectable()
export class ObservabilityTracingMiddleware implements NestMiddleware {
  constructor(private readonly observabilityClient: AiObservabilityClient) {}

  async use(req: GatewayRequest, _res: Response, next: NextFunction) {
    const context = req.gatewayContext;
    if (!context) return next();

    const path = req.path.includes("embeddings") ? "gateway.embeddings" : "gateway.inference";
    const started = await this.observabilityClient.startSpan(context.tenantId, path, {
      keyId: context.keyId,
      model: (req.body as { model?: string })?.model,
    });

    if (started) {
      (req as GatewayRequest & { observabilityContext?: ObservabilityContext }).observabilityContext = {
        traceId: started.traceId,
        spanId: started.spanId,
        startedAt: Date.now(),
      };
    }

    next();
  }
}
