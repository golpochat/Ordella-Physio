import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import type { NextFunction, Response } from "express";
import {
  TENANT_HEADER,
  USER_EMAIL_HEADER,
  USER_ID_HEADER,
  USER_ROLE_HEADER,
} from "../common/constants";
import type { AuthContext, AuthRole, OrdellaRequest } from "../common/types";
import { getHeaderValue } from "../utils";

export type AuthContextMiddlewareOptions = {
  required?: boolean;
  skipPaths?: string[];
};

function shouldSkip(path: string, skipPaths: string[]): boolean {
  return skipPaths.some((skipPath) => path === skipPath || path.startsWith(`${skipPath}/`));
}

export function getAuthContext(request: OrdellaRequest): AuthContext | undefined {
  return request.authContext;
}

@Injectable()
export class AuthContextMiddleware implements NestMiddleware {
  constructor(private readonly options: AuthContextMiddlewareOptions = { required: true }) {}

  use(request: OrdellaRequest, _response: Response, next: NextFunction): void {
    const path = request.originalUrl.split("?")[0] ?? request.path;
    const skipPaths = this.options.skipPaths ?? [];

    if (shouldSkip(path, skipPaths)) {
      next();
      return;
    }

    const userId = getHeaderValue(request, USER_ID_HEADER);
    const role = getHeaderValue(request, USER_ROLE_HEADER) as AuthRole | undefined;
    const tenantId = getHeaderValue(request, TENANT_HEADER) ?? request.tenantId;
    const email = getHeaderValue(request, USER_EMAIL_HEADER);

    if (role === "SYSTEM") {
      if (!userId) {
        if (this.options.required !== false) {
          throw new UnauthorizedException("Missing authenticated user context headers");
        }

        next();
        return;
      }

      request.isSystem = true;
      request.tenantId = undefined;
      request.authContext = {
        userId,
        role,
        isSystem: true,
        ...(email ? { email } : {}),
      };

      next();
      return;
    }

    if (!userId || !role || !tenantId) {
      if (this.options.required !== false) {
        throw new UnauthorizedException("Missing authenticated user context headers");
      }

      next();
      return;
    }

    request.authContext = {
      userId,
      tenantId,
      role,
      ...(email ? { email } : {}),
    };
    request.tenantId = tenantId;

    next();
  }
}

export function createAuthContextMiddleware(
  options?: AuthContextMiddlewareOptions,
): typeof AuthContextMiddleware {
  @Injectable()
  class ConfiguredAuthContextMiddleware extends AuthContextMiddleware {
    constructor() {
      super(options);
    }
  }

  return ConfiguredAuthContextMiddleware;
}
