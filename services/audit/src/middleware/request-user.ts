import type { SecurityRole } from "@ordella/security";

export type AuthenticatedAuditRequestUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};

export function resolveRequestUser(request: {
  user?: AuthenticatedAuditRequestUser;
}): AuthenticatedAuditRequestUser | null {
  return request.user ?? null;
}
