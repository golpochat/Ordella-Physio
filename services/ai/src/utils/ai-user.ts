import type { SecurityRole } from "@ordella/security";

export type AuthenticatedAiUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
