import {
  ROLE_LEVELS,
  getRoleLevel,
  isSystemRole,
  roleMeetsMinLevel,
  type SecurityRole,
} from "@ordella/security";
import { tenantMismatchError } from "@/utils/auth-errors";

export { ROLE_LEVELS, getRoleLevel, isSystemRole, roleMeetsMinLevel };

export type AuthUserContext = {
  userId: string;
  tenantId?: string;
  role: SecurityRole;
  email?: string;
};

export function isSystem(user: Pick<AuthUserContext, "role">): boolean {
  return isSystemRole(user.role);
}

export function assertTenantAccess(
  user: AuthUserContext,
  resourceTenantId: string,
): void {
  if (isSystem(user)) {
    return;
  }

  if (!user.tenantId || user.tenantId !== resourceTenantId) {
    throw tenantMismatchError();
  }
}
