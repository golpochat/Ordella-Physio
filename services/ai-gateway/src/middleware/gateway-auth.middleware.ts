import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import type { ValidatedKeyContext } from "@/models/AIGatewayKey";
import { GatewayKeyService } from "@/services/gateway-key.service";

export type GatewayRequest = Request & {
  gatewayContext?: ValidatedKeyContext;
};

@Injectable()
export class GatewayAuthMiddleware implements NestMiddleware {
  constructor(private readonly gatewayKeyService: GatewayKeyService) {}

  async use(req: GatewayRequest, _res: Response, next: NextFunction) {
    const headerKey = req.header("x-api-key");
    const authHeader = req.header("authorization");
    const bearerKey = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    const apiKey = headerKey ?? bearerKey;

    if (!apiKey) {
      throw new UnauthorizedException("API key required.");
    }

    const context = await this.gatewayKeyService.validateKey(apiKey);
    if (!context) {
      throw new UnauthorizedException("Invalid or revoked API key.");
    }

    req.gatewayContext = context;
    next();
  }
}
