import type { SecurityRole } from "@ordella/security";

export type AuthenticatedSecurityUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
