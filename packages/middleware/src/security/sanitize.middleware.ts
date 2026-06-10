import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import type { OrdellaRequest } from "../common/types";

const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value !== null && typeof value === "object") {
    const sanitized: Record<string, unknown> = {};

    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (DANGEROUS_KEYS.has(key)) {
        continue;
      }

      sanitized[key] = sanitizeValue(nested);
    }

    return sanitized;
  }

  return value;
}

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  use(request: OrdellaRequest, _response: Response, next: NextFunction): void {
    if (request.body && typeof request.body === "object") {
      request.body = sanitizeValue(request.body);
    }

    if (request.query && typeof request.query === "object") {
      request.query = sanitizeValue(request.query) as typeof request.query;
    }

    next();
  }
}
