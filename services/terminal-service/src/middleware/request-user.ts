import type { SecurityRole } from "@ordella/security";

export type AuthenticatedTerminalRequestUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};

export function resolveRequestUser(request: {
  user?: AuthenticatedTerminalRequestUser;
}): AuthenticatedTerminalRequestUser | null {
  return request.user ?? null;
}
