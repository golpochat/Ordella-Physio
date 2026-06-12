import type { SecurityRole } from "@ordella/security";

export type AuthenticatedRoleRequestUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};

export function resolveRequestUser(request: {
  user?: AuthenticatedRoleRequestUser;
}): AuthenticatedRoleRequestUser | null {
  return request.user ?? null;
}
