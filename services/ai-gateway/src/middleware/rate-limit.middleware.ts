import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import type { GatewayRequest } from "@/middleware/gateway-auth.middleware";
import { RateLimitService } from "@/services/rate-limit.service";

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private readonly rateLimitService: RateLimitService) {}

  async use(req: GatewayRequest, _res: Response, next: NextFunction) {
    const context = req.gatewayContext;
    if (!context) return next();

    const estimatedTokens = Number((req.body as { maxTokens?: number })?.maxTokens ?? 0);
    const result = await this.rateLimitService.checkRateLimit(
      context.tenantId,
      context.keyId,
      context.rateLimitProfileId,
      estimatedTokens,
    );

    if (!result.allowed || context.isThrottled) {
      throw new HttpException(
        {
          message: context.isThrottled ? "API key throttled due to abuse detection." : "Rate limit exceeded.",
          violations: result.violations,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }
}
