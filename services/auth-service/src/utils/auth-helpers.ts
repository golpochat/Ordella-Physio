import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { AuditRequestContext } from "@/middleware/audit.middleware";
import type { SecurityRole } from "@ordella/security";

export type AuthenticatedRequestUser = {
  userId: string;
  tenantId: string | null;
  role: SecurityRole;
  email?: string;
  sessionId?: string;
  permissions?: string[];
  effectiveRole?: string;
  resolvedPermissions?: string[];
};

export const TenantId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<OrdellaRequest>();
  return request.tenantId;
});

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<OrdellaRequest & { user?: AuthenticatedRequestUser }>();
  return request.user;
});

export function coalesceTenantId(tenantId: string | null | undefined): string {
  return tenantId ?? "";
}

export function sanitizeUser(user: {
  id: string;
  tenantId: string | null;
  organizationId?: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  mfaEnabled?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  permissionOverrides?: string[];
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    tenantId: user.tenantId,
    organizationId: user.organizationId ?? null,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    mfaEnabled: user.mfaEnabled ?? false,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export function getRequestMetadata(request: OrdellaRequest & { auditContext?: AuditRequestContext }) {
  return {
    ipAddress: request.auditContext?.ipAddress ?? request.ip,
    userAgent: request.auditContext?.userAgent ?? request.headers["user-agent"],
    correlationId: request.correlationId,
  };
}
