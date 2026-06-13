import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import type { GatewayRequest } from "@/middleware/gateway-auth.middleware";
import { AiSecurityClient } from "@/integrations/ai-security.client";

@Injectable()
export class SecurityAccessMiddleware implements NestMiddleware {
  constructor(private readonly securityClient: AiSecurityClient) {}

  async use(req: GatewayRequest, _res: Response, next: NextFunction) {
    const context = req.gatewayContext;
    if (!context) return next();

    const modelId = String((req.body as { model?: string })?.model ?? "unknown");
    const access = await this.securityClient.checkAccess(context.tenantId, modelId, context.keyId);
    if (!access.allowed) {
      throw new ForbiddenException(access.reason ?? "Model access denied by security policy.");
    }

    next();
  }
}

@Injectable()
export class SecurityPiiMiddleware implements NestMiddleware {
  constructor(private readonly securityClient: AiSecurityClient) {}

  async use(req: GatewayRequest, _res: Response, next: NextFunction) {
    const context = req.gatewayContext;
    if (!context) return next();

    const body = req.body as { prompt?: string; text?: string; model?: string };
    const inputText = body.prompt ?? body.text ?? "";
    if (!inputText) return next();

    const modelId = String(body.model ?? "unknown");
    const redaction = await this.securityClient.redactText(context.tenantId, inputText, modelId);
    if (redaction.piiDetected) {
      if (body.prompt) body.prompt = redaction.redacted;
      if (body.text) body.text = redaction.redacted;
      (req as GatewayRequest & { securityMeta?: Record<string, unknown> }).securityMeta = {
        piiDetected: true,
        redacted: true,
        piiTypes: redaction.types,
      };
    }

    next();
  }
}
