import type { SecurityRole } from "@ordella/security";

export type AuthenticatedMonitoringUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
