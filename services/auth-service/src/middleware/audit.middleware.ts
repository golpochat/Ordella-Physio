import { Injectable, NestMiddleware } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { NextFunction, Response } from "express";

export type AuditRequestContext = {
  ipAddress?: string;
  userAgent?: string;
};

export type RequestWithAuditContext = OrdellaRequest & {
  auditContext?: AuditRequestContext;
};

function resolveClientIp(request: OrdellaRequest): string | undefined {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim();
  }

  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim();
  }

  return request.ip;
}

@Injectable()
export class AuditContextMiddleware implements NestMiddleware {
  use(request: RequestWithAuditContext, _response: Response, next: NextFunction): void {
    const userAgentHeader = request.headers["user-agent"];

    request.auditContext = {
      ipAddress: resolveClientIp(request),
      userAgent: typeof userAgentHeader === "string" ? userAgentHeader : undefined,
    };

    next();
  }
}
