import type { SecurityRole } from "@ordella/security";

export type AuthenticatedAgentsUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
