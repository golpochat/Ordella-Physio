import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";

import { USER_ROLE_HEADER } from "../common/constants";
import type { OrdellaRequest } from "../common/types";
import { getHeaderValue } from "../utils";

export type TenantStatusMiddlewareOptions = {
  tenantServiceUrl?: string;
  skipPaths?: string[];
};

function shouldSkip(path: string, skipPaths: string[]): boolean {
  return skipPaths.some((skipPath) => path === skipPath || path.startsWith(`${skipPath}/`));
}

function serializeError(code: string, message: string) {
  return {
    success: false,
    error: { code, message },
    timestamp: new Date().toISOString(),
  };
}

@Injectable()
export class TenantStatusMiddleware implements NestMiddleware {
  private readonly tenantServiceUrl: string;

  constructor(private readonly options: TenantStatusMiddlewareOptions = {}) {
    this.tenantServiceUrl =
      options.tenantServiceUrl ?? process.env.TENANT_SERVICE_URL ?? "http://localhost:3052";
  }

  async use(request: OrdellaRequest, response: Response, next: NextFunction): Promise<void> {
    const path = request.originalUrl.split("?")[0] ?? request.path;
    const skipPaths = this.options.skipPaths ?? [];

    if (shouldSkip(path, skipPaths)) {
      next();
      return;
    }

    const role = getHeaderValue(request, USER_ROLE_HEADER) ?? request.authContext?.role;
    if (role === "SYSTEM" || request.isSystem || request.authContext?.isSystem) {
      next();
      return;
    }

    const tenantId = request.tenantId ?? request.authContext?.tenantId;
    if (!tenantId) {
      next();
      return;
    }

    try {
      const baseUrl = this.tenantServiceUrl.replace(/\/$/, "");
      const statusResponse = await fetch(`${baseUrl}/tenants/internal/status/${tenantId}`, {
        headers: request.correlationId ? { "x-correlation-id": request.correlationId } : undefined,
      });

      if (statusResponse.status === 404) {
        response
          .status(404)
          .json(serializeError("TENANT_NOT_FOUND", "Tenant does not exist."));
        return;
      }

      if (!statusResponse.ok) {
        next();
        return;
      }

      const payload = (await statusResponse.json()) as { status?: string };
      if (payload.status === "SUSPENDED") {
        response.status(403).json(
          serializeError(
            "TENANT_SUSPENDED",
            "This tenant is suspended. Please contact support.",
          ),
        );
        return;
      }

      next();
    } catch {
      next();
    }
  }
}

export function createTenantStatusMiddleware(
  options?: TenantStatusMiddlewareOptions,
): typeof TenantStatusMiddleware {
  @Injectable()
  class ConfiguredTenantStatusMiddleware extends TenantStatusMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredTenantStatusMiddleware;
}
