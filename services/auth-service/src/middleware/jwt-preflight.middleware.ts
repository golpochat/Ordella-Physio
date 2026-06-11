import { Injectable, NestMiddleware } from "@nestjs/common";
import { authConfig } from "@ordella/config";
import type { OrdellaRequest } from "@ordella/middleware";
import { verifyToken, type AccessTokenPayload } from "@ordella/security";
import type { NextFunction, Response } from "express";
import { TENANT_HEADER, USER_ROLE_HEADER } from "@ordella/middleware";

const AUTH_PUBLIC_PATHS = ["/auth/health", "/auth/login", "/auth/register", "/auth/refresh"];

function shouldSkip(path: string): boolean {
  return AUTH_PUBLIC_PATHS.some((skipPath) => path === skipPath || path.startsWith(`${skipPath}/`));
}

@Injectable()
export class AuthJwtPreflightMiddleware implements NestMiddleware {
  use(request: OrdellaRequest, _response: Response, next: NextFunction): void {
    const path = request.originalUrl.split("?")[0] ?? request.path;

    if (shouldSkip(path)) {
      next();
      return;
    }

    const authorization = request.headers.authorization;
    if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
      next();
      return;
    }

    const token = authorization.slice("Bearer ".length).trim();

    try {
      const payload = verifyToken<AccessTokenPayload>(token, {
        algorithm: "HS256",
        secret: authConfig.jwtSecret,
      });

      const role = payload.role;
      const userId = payload.userId ?? payload.sub;

      request.headers[USER_ROLE_HEADER] = role;

      if (role === "SYSTEM") {
        request.isSystem = true;
        request.tenantId = undefined;
        delete request.headers[TENANT_HEADER];
        delete request.headers[TENANT_HEADER.toLowerCase()];
        request.authContext = {
          userId,
          role,
          isSystem: true,
          ...(payload.email ? { email: payload.email } : {}),
        };
      } else if (!request.headers[TENANT_HEADER] && payload.tenantId) {
        request.headers[TENANT_HEADER] = payload.tenantId;
        request.tenantId = payload.tenantId;
      }
    } catch {
      // Protected routes will reject invalid tokens in JwtGuard.
    }

    next();
  }
}
