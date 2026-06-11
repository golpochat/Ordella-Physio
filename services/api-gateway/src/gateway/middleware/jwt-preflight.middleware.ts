import { Injectable, NestMiddleware } from "@nestjs/common";
import { gatewayConfig } from "@ordella/config";
import type { OrdellaRequest } from "@ordella/middleware";
import { verifyToken, type AccessTokenPayload } from "@ordella/security";
import type { NextFunction, Response } from "express";
import type { GatewayUser } from "@/constants";
import { TENANT_HEADER, USER_ROLE_HEADER } from "@/constants";
import { getRequestPath, isPublicJwtPath } from "@/utils/route-builder";

type GatewayRequest = OrdellaRequest & { user?: GatewayUser };

@Injectable()
export class JwtPreflightMiddleware implements NestMiddleware {
  use(request: GatewayRequest, _response: Response, next: NextFunction): void {
    const path = getRequestPath(request);

    if (request.user?.role) {
      next();
      return;
    }

    if (isPublicJwtPath(path)) {
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
        secret: gatewayConfig.jwtSecret,
      });

      const role = payload.role;
      const userId = payload.userId ?? payload.sub;

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
        request.headers[USER_ROLE_HEADER] = role;
      } else if (!request.headers[TENANT_HEADER] && payload.tenantId) {
        request.headers[TENANT_HEADER] = payload.tenantId;
        request.tenantId = payload.tenantId;
      }
    } catch {
      // JwtAuthGuard will reject invalid tokens on protected routes.
    }

    next();
  }
}
