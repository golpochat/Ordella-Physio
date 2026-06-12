import type { SecurityRole } from "@ordella/security";

export type AuthenticatedSubscriptionUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
