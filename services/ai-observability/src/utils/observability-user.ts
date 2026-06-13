import type { SecurityRole } from "@ordella/security";

export type AuthenticatedObservabilityUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
