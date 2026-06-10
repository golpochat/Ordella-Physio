import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import { TENANT_HEADER } from "../common/constants";
import type { OrdellaRequest } from "../common/types";
import { getHeaderValue } from "../utils";

export type TenantMiddlewareOptions = {
  required?: boolean;
  skipPaths?: string[];
};

function shouldSkip(path: string, skipPaths: string[]): boolean {
  return skipPaths.some((skipPath) => path === skipPath || path.startsWith(`${skipPath}/`));
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly options: TenantMiddlewareOptions = { required: true }) {}

  use(request: OrdellaRequest, _response: Response, next: NextFunction): void {
    const path = request.originalUrl.split("?")[0] ?? request.path;
    const skipPaths = this.options.skipPaths ?? [];

    if (shouldSkip(path, skipPaths)) {
      next();
      return;
    }

    const tenantId = getHeaderValue(request, TENANT_HEADER) ?? request.authContext?.tenantId;

    if (!tenantId) {
      if (this.options.required !== false) {
        throw new BadRequestException(`Missing required header: ${TENANT_HEADER}`);
      }

      next();
      return;
    }

    request.tenantId = tenantId;
    request.headers[TENANT_HEADER] = tenantId;
    next();
  }
}

export function createTenantMiddleware(
  options?: TenantMiddlewareOptions,
): typeof TenantMiddleware {
  @Injectable()
  class ConfiguredTenantMiddleware extends TenantMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredTenantMiddleware;
}
