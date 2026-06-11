import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { gatewayConfig } from "@ordella/config";
import {
  getPermissionsForRole,
  verifyToken,
  type AccessTokenPayload,
} from "@ordella/security";
import type { Request } from "express";
import type { GatewayUser } from "@/constants";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { getRequestPath, isPublicJwtPath } from "@/utils/route-builder";

type GatewayRequest = Request & { user?: GatewayUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<GatewayRequest>();
    const path = getRequestPath(request);

    if (isPublicJwtPath(path)) {
      return true;
    }

    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const token = authorization.slice("Bearer ".length).trim();
    const config = gatewayConfig;

    let payload: AccessTokenPayload;
    try {
      payload = verifyToken<AccessTokenPayload>(token, {
        algorithm: "HS256",
        secret: config.jwtSecret,
      });
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }

    const role = payload.role;
    const permissions = getPermissionsForRole(role);

    request.user = {
      userId: payload.userId ?? payload.sub,
      tenantId: payload.tenantId,
      role,
      roles: [role],
      permissions,
      email: payload.email,
    };

    if (role === "SYSTEM") {
      delete request.headers["x-tenant-id"];
    } else if (!request.headers["x-tenant-id"] && payload.tenantId) {
      request.headers["x-tenant-id"] = payload.tenantId;
    }

    return true;
  }
}
