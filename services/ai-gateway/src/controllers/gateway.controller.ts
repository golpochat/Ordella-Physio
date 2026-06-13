import {

  Body,

  Controller,

  ForbiddenException,

  Post,

  Req,

} from "@nestjs/common";

import type { GatewayRequest } from "@/middleware/gateway-auth.middleware";
import type { ObservabilityContext } from "@/middleware/observability.middleware";

import { AiInferenceClient } from "@/integrations/ai-inference.client";

import { AiObservabilityClient } from "@/integrations/ai-observability.client";

import { AiSecurityClient } from "@/integrations/ai-security.client";

import { AbuseDetectionService } from "@/services/abuse-detection.service";

import { GatewayKeyService } from "@/services/gateway-key.service";

import { RateLimitService } from "@/services/rate-limit.service";

import { UsageTrackingService } from "@/services/usage-tracking.service";



@Controller("gateway")

export class GatewayController {

  constructor(

    private readonly inferenceClient: AiInferenceClient,

    private readonly securityClient: AiSecurityClient,

    private readonly observabilityClient: AiObservabilityClient,

    private readonly gatewayKeyService: GatewayKeyService,

    private readonly rateLimitService: RateLimitService,

    private readonly usageTrackingService: UsageTrackingService,

    private readonly abuseDetectionService: AbuseDetectionService,

  ) {}



  @Post("inference")

  async runInference(@Req() req: GatewayRequest, @Body() body: Record<string, unknown>) {

    const context = req.gatewayContext;

    if (!context) throw new ForbiddenException("Gateway context missing.");

    if (!context.scopes.includes("inference")) {

      throw new ForbiddenException("API key missing inference scope.");

    }



    const modelId = String(body.model ?? "unknown");

    const securityMeta = (req as GatewayRequest & { securityMeta?: Record<string, unknown> }).securityMeta ?? {};



    const proxy = await this.inferenceClient.runInference(body, context.tenantId);

    const totalTokens = proxy.tokensPrompt + proxy.tokensCompletion;



    const outputText = JSON.stringify(proxy.result ?? {});

    const outputRedaction = await this.securityClient.redactText(context.tenantId, outputText, modelId);

    const piiDetected = Boolean(securityMeta.piiDetected) || outputRedaction.piiDetected;



    this.rateLimitService.incrementUsage(context.tenantId, context.keyId, totalTokens);

    await this.usageTrackingService.recordUsage({

      tenantId: context.tenantId,

      gatewayKeyId: context.keyId,

      modelId: proxy.modelId,

      tokensPrompt: proxy.tokensPrompt,

      tokensCompletion: proxy.tokensCompletion,

      latencyMs: proxy.latencyMs,

      success: proxy.success,

      metadata: { endpoint: "inference", ...securityMeta, outputPiiDetected: outputRedaction.piiDetected },

    });

    this.abuseDetectionService.recordRequest(context.tenantId, context.keyId, proxy.success, totalTokens);

    await this.gatewayKeyService.touchKey(context.keyId);



    await this.securityClient.recordAudit(context.tenantId, {

      action: "INFERENCE",

      apiKeyId: context.keyId,

      modelId: proxy.modelId,

      requestMetadata: { model: modelId, redacted: securityMeta.redacted ?? false },

      responseMetadata: { success: proxy.success, latencyMs: proxy.latencyMs },

      piiDetected,

      redacted: Boolean(securityMeta.redacted) || outputRedaction.piiDetected,

    });

    const obsContext = (req as GatewayRequest & { observabilityContext?: ObservabilityContext }).observabilityContext;
    if (obsContext) {
      await this.observabilityClient.endSpan(
        context.tenantId,
        obsContext.spanId,
        proxy.success ? "OK" : "ERROR",
        { modelId: proxy.modelId, latencyMs: proxy.latencyMs },
      );
    }
    await this.observabilityClient.recordBatch(context.tenantId, {
      trace: {
        traceId: obsContext?.traceId,
        service: "gateway",
        operation: "inference.request",
        durationMs: proxy.latencyMs,
        status: proxy.success ? "OK" : "ERROR",
        metadata: { modelId: proxy.modelId, keyId: context.keyId },
      },
      log: {
        level: proxy.success ? "INFO" : "ERROR",
        service: "gateway",
        message: proxy.success ? "Inference completed" : "Inference failed",
        metadata: { modelId: proxy.modelId, latencyMs: proxy.latencyMs },
      },
      metrics: [
        { modelId: proxy.modelId, metricType: "latency", value: proxy.latencyMs },
        { modelId: proxy.modelId, metricType: "token_usage", value: totalTokens },
        { modelId: proxy.modelId, metricType: "error_rate", value: proxy.success ? 0 : 1 },
        { modelId: proxy.modelId, metricType: "throughput", value: totalTokens },
      ],
    });



    return {

      data: proxy.result,

      usage: {

        tokensPrompt: proxy.tokensPrompt,

        tokensCompletion: proxy.tokensCompletion,

        latencyMs: proxy.latencyMs,

      },

      security: { piiDetected, redacted: Boolean(securityMeta.redacted) },

      warning: (req as GatewayRequest & { budgetWarning?: string }).budgetWarning,

    };

  }



  @Post("embeddings")

  async runEmbeddings(@Req() req: GatewayRequest, @Body() body: Record<string, unknown>) {

    const context = req.gatewayContext;

    if (!context) throw new ForbiddenException("Gateway context missing.");

    if (!context.scopes.includes("embeddings") && !context.scopes.includes("inference")) {

      throw new ForbiddenException("API key missing embeddings scope.");

    }



    const modelId = String(body.model ?? "embed");

    const securityMeta = (req as GatewayRequest & { securityMeta?: Record<string, unknown> }).securityMeta ?? {};



    const proxy = await this.inferenceClient.runEmbeddings(body, context.tenantId);

    const totalTokens = proxy.tokensPrompt + proxy.tokensCompletion;



    this.rateLimitService.incrementUsage(context.tenantId, context.keyId, totalTokens);

    await this.usageTrackingService.recordUsage({

      tenantId: context.tenantId,

      gatewayKeyId: context.keyId,

      modelId: proxy.modelId,

      tokensPrompt: proxy.tokensPrompt,

      tokensCompletion: proxy.tokensCompletion,

      latencyMs: proxy.latencyMs,

      success: proxy.success,

      metadata: { endpoint: "embeddings", ...securityMeta },

    });

    this.abuseDetectionService.recordRequest(context.tenantId, context.keyId, proxy.success, totalTokens);

    await this.gatewayKeyService.touchKey(context.keyId);



    await this.securityClient.recordAudit(context.tenantId, {

      action: "INFERENCE",

      apiKeyId: context.keyId,

      modelId: proxy.modelId,

      requestMetadata: { endpoint: "embeddings", model: modelId },

      responseMetadata: { success: proxy.success },

      piiDetected: Boolean(securityMeta.piiDetected),

      redacted: Boolean(securityMeta.redacted),

    });

    const obsContext = (req as GatewayRequest & { observabilityContext?: ObservabilityContext }).observabilityContext;
    if (obsContext) {
      await this.observabilityClient.endSpan(
        context.tenantId,
        obsContext.spanId,
        proxy.success ? "OK" : "ERROR",
        { modelId: proxy.modelId },
      );
    }
    await this.observabilityClient.recordBatch(context.tenantId, {
      trace: {
        traceId: obsContext?.traceId,
        service: "gateway",
        operation: "embeddings.request",
        durationMs: proxy.latencyMs,
        status: proxy.success ? "OK" : "ERROR",
      },
      log: {
        level: "INFO",
        service: "gateway",
        message: "Embeddings request completed",
        metadata: { modelId: proxy.modelId },
      },
      metrics: [
        { modelId: proxy.modelId, metricType: "latency", value: proxy.latencyMs },
        { modelId: proxy.modelId, metricType: "token_usage", value: totalTokens },
      ],
    });



    return {

      data: proxy.result,

      usage: {

        tokensPrompt: proxy.tokensPrompt,

        tokensCompletion: proxy.tokensCompletion,

        latencyMs: proxy.latencyMs,

      },

      security: { piiDetected: securityMeta.piiDetected ?? false },

    };

  }

}


