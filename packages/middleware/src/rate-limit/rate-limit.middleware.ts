import {
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";import type { NextFunction, Response } from "express";
import {
  DEFAULT_RATE_LIMIT_MAX,
  DEFAULT_RATE_LIMIT_WINDOW_MS,
  DEFAULT_TENANT_RATE_LIMIT_MAX,
} from "../common/constants";
import type { OrdellaRequest } from "../common/types";
import { getRequestIp } from "../utils";
import {
  InMemoryRateLimitStore,
  type RateLimitStore,
} from "./rate-limit.store";

export type RateLimitMiddlewareOptions = {
  windowMs?: number;
  maxRequestsPerIp?: number;
  maxRequestsPerTenant?: number;
  store?: RateLimitStore;
  skipPaths?: string[];
};

function shouldSkip(path: string, skipPaths: string[]): boolean {
  return skipPaths.some((skipPath) => path === skipPath || path.startsWith(`${skipPath}/`));
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly store: RateLimitStore;

  constructor(private readonly options: RateLimitMiddlewareOptions = {}) {
    this.store = options.store ?? new InMemoryRateLimitStore();
  }

  async use(request: OrdellaRequest, response: Response, next: NextFunction): Promise<void> {
    const path = request.originalUrl.split("?")[0] ?? request.path;
    const skipPaths = this.options.skipPaths ?? [];

    if (shouldSkip(path, skipPaths)) {
      next();
      return;
    }

    const windowMs = this.options.windowMs ?? DEFAULT_RATE_LIMIT_WINDOW_MS;
    const maxIp = this.options.maxRequestsPerIp ?? DEFAULT_RATE_LIMIT_MAX;
    const maxTenant = this.options.maxRequestsPerTenant ?? DEFAULT_TENANT_RATE_LIMIT_MAX;
    const ip = getRequestIp(request);
    const tenantId = request.tenantId ?? request.authContext?.tenantId ?? "anonymous";

    const ipResult = await this.store.increment(`rate:ip:${ip}`, windowMs);
    if (ipResult.count > maxIp) {
      this.sendRateLimitResponse(response, ipResult.resetAt);
      return;
    }

    const tenantResult = await this.store.increment(`rate:tenant:${tenantId}`, windowMs);
    if (tenantResult.count > maxTenant) {
      this.sendRateLimitResponse(response, tenantResult.resetAt);
      return;
    }

    response.setHeader("X-RateLimit-Limit-Ip", String(maxIp));
    response.setHeader("X-RateLimit-Remaining-Ip", String(Math.max(0, maxIp - ipResult.count)));
    response.setHeader("X-RateLimit-Reset", String(Math.ceil(ipResult.resetAt / 1000)));

    next();
  }

  private sendRateLimitResponse(response: Response, resetAt: number): void {
    response.setHeader("Retry-After", String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))));
    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests",
    });
  }
}
export function createRateLimitMiddleware(
  options?: RateLimitMiddlewareOptions,
): typeof RateLimitMiddleware {
  @Injectable()
  class ConfiguredRateLimitMiddleware extends RateLimitMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredRateLimitMiddleware;
}
