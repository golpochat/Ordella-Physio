import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { SecurityRole } from "@ordella/security";

export type AuthenticatedRequestUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  sessionId?: string;
  permissions?: string[];
};

export const TenantId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<OrdellaRequest>();
  return request.tenantId;
});

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<OrdellaRequest & { user?: AuthenticatedRequestUser }>();
  return request.user;
});

export function sanitizeUser(user: {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  emailVerified: boolean;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    tenantId: user.tenantId,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export function getRequestMetadata(request: OrdellaRequest) {
  return {
    ipAddress: request.ip,
    userAgent: request.headers["user-agent"],
    correlationId: request.correlationId,
  };
}
