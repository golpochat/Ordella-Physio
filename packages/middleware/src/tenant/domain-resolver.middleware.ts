import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";

import { TENANT_HEADER } from "../common/constants";
import type { OrdellaRequest } from "../common/types";
import { getHeaderValue } from "../utils";

export type DomainResolverMiddlewareOptions = {
  tenantServiceUrl?: string;
  skipPaths?: string[];
  skipHosts?: string[];
};

function shouldSkip(path: string, skipPaths: string[]): boolean {
  return skipPaths.some((skipPath) => path === skipPath || path.startsWith(`${skipPath}/`));
}

function normalizeHost(hostHeader: string | undefined): string | null {
  if (!hostHeader) {
    return null;
  }

  return hostHeader.split(":")[0]?.trim().toLowerCase() ?? null;
}

@Injectable()
export class DomainResolverMiddleware implements NestMiddleware {
  private readonly tenantServiceUrl: string;
  private readonly skipHosts: Set<string>;

  constructor(private readonly options: DomainResolverMiddlewareOptions = {}) {
    this.tenantServiceUrl =
      options.tenantServiceUrl ?? process.env.TENANT_SERVICE_URL ?? "http://localhost:3052";
    this.skipHosts = new Set(
      (options.skipHosts ?? ["localhost", "127.0.0.1"]).map((host) => host.toLowerCase()),
    );
  }

  async use(request: OrdellaRequest, _response: Response, next: NextFunction): Promise<void> {
    const path = request.originalUrl.split("?")[0] ?? request.path;
    const skipPaths = this.options.skipPaths ?? [];

    if (shouldSkip(path, skipPaths)) {
      next();
      return;
    }

    if (request.tenantId || request.authContext?.tenantId) {
      next();
      return;
    }

    const host = normalizeHost(request.headers.host);
    if (!host || this.skipHosts.has(host)) {
      next();
      return;
    }

    try {
      const baseUrl = this.tenantServiceUrl.replace(/\/$/, "");
      const encodedHost = encodeURIComponent(host);
      const resolveResponse = await fetch(`${baseUrl}/tenants/internal/domain/${encodedHost}`, {
        headers: request.correlationId ? { "x-correlation-id": request.correlationId } : undefined,
      });

      if (!resolveResponse.ok) {
        next();
        return;
      }

      const payload = (await resolveResponse.json()) as {
        tenantId?: string;
        verified?: boolean;
      } | null;

      if (payload?.tenantId && payload.verified !== false) {
        request.tenantId = payload.tenantId;
        request.headers[TENANT_HEADER] = payload.tenantId;
      }

      next();
    } catch {
      next();
    }
  }
}

export function createDomainResolverMiddleware(
  options?: DomainResolverMiddlewareOptions,
): typeof DomainResolverMiddleware {
  @Injectable()
  class ConfiguredDomainResolverMiddleware extends DomainResolverMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredDomainResolverMiddleware;
}
