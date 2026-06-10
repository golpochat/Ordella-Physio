import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import { TENANT_HEADER, rbacService, type SecurityUser } from "@ordella/security";

function getHeaderTenantId(request: Request): string | undefined {
  const value = request.headers[TENANT_HEADER] ?? request.headers[TENANT_HEADER.toLowerCase()];
  if (typeof value === "string" && value.length > 0) return value;
  if (Array.isArray(value) && value.length > 0) return value[0];
  return undefined;
}

@Injectable()
export class EnterpriseTenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: SecurityUser; tenantId?: string }>();
    const user = request.user;
    if (!user) throw new UnauthorizedException("Authentication required");

    const tenantId = request.tenantId ?? getHeaderTenantId(request);
    if (!tenantId) throw new BadRequestException(`Missing required header: ${TENANT_HEADER}`);

    if (user.role === "SYSTEM") {
      request.tenantId = tenantId;
      return true;
    }

    if (!rbacService.enforceTenantIsolation(user, tenantId)) {
      throw new ForbiddenException("Tenant mismatch");
    }

    request.tenantId = tenantId;
    return true;
  }
}
