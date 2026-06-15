import type { NextFunction, Request, Response } from "express";

import { env } from "../config";
import { getRateLimitStore } from "../lib/redis";
import { logSecurityEvent } from "../modules/security/security-events.service";
import { TooManyRequestsError } from "../utils/security-errors";

function getClientKey(req: Request): string {
  const userId = req.user?.id ?? "anon";
  const ip = req.ip ?? "unknown";
  return `${ip}:${userId}`;
}

export function createRateLimiter(options?: {
  max?: number;
  windowMs?: number;
  keyPrefix?: string;
}) {
  const max = options?.max ?? env.RATE_LIMIT_MAX;
  const windowMs = options?.windowMs ?? env.RATE_LIMIT_WINDOW_MS;
  const keyPrefix = options?.keyPrefix ?? "global";

  return (req: Request, res: Response, next: NextFunction): void => {
    void (async () => {
      try {
        const store = getRateLimitStore();
        const key = `rate:${keyPrefix}:${getClientKey(req)}`;
        const result = await store.increment(key, windowMs);

        if (result.count > max) {
          const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
          res.setHeader("Retry-After", String(retryAfterSeconds));
          res.setHeader("X-RateLimit-Limit", String(max));
          res.setHeader("X-RateLimit-Remaining", String(Math.max(0, max - result.count)));
          res.setHeader("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));

          logSecurityEvent({
            type: "rate_limit",
            message: "Rate limit exceeded",
            req,
            metadata: { key, max, windowMs, keyPrefix, store: store.constructor.name },
          });

          next(new TooManyRequestsError(undefined, retryAfterSeconds));
          return;
        }

        res.setHeader("X-RateLimit-Limit", String(max));
        res.setHeader("X-RateLimit-Remaining", String(Math.max(0, max - result.count)));
        res.setHeader("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));
        next();
      } catch (error) {
        next(error);
      }
    })();
  };
}

export const globalRateLimiter = createRateLimiter({ keyPrefix: "global" });
export const authRateLimiter = createRateLimiter({
  max: env.AUTH_RATE_LIMIT_MAX,
  keyPrefix: "auth",
});
