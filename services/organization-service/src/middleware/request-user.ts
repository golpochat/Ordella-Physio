import type { SecurityRole } from "@ordella/security";

export type AuthenticatedOrganizationRequestUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};

export function resolveRequestUser(request: {
  user?: AuthenticatedOrganizationRequestUser;
}): AuthenticatedOrganizationRequestUser | null {
  return request.user ?? null;
}
