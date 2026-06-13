import type { SecurityRole } from "@ordella/security";

export type AuthenticatedCostUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
