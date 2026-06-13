import type { SecurityRole } from "@ordella/security";

export type AuthenticatedDeployUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
