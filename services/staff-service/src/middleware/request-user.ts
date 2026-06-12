import type { SecurityRole } from "@ordella/security";

export type AuthenticatedStaffRequestUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};

export function resolveRequestUser(request: {
  user?: AuthenticatedStaffRequestUser;
}): AuthenticatedStaffRequestUser | null {
  return request.user ?? null;
}
