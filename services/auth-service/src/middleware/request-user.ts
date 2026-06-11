import type { OrdellaRequest } from "@ordella/middleware";
import { isSecurityRole, type SecurityRole } from "@ordella/security";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";
import type { AuthUserContext } from "@/utils/roles";

export type AuthenticatedRequest = OrdellaRequest & {
  user?: AuthenticatedRequestUser;
};

export function resolveRequestUser(request: AuthenticatedRequest): AuthUserContext | null {
  if (request.user?.userId && request.user.role) {
    return {
      userId: request.user.userId,
      tenantId: request.user.tenantId,
      role: request.user.role,
      email: request.user.email,
    };
  }

  const authContext = request.authContext;
  if (authContext?.userId && authContext.role && isSecurityRole(authContext.role)) {
    return {
      userId: authContext.userId,
      tenantId: authContext.tenantId ?? request.tenantId,
      role: authContext.role as SecurityRole,
      email: authContext.email,
    };
  }

  return null;
}
