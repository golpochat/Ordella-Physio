import type { SecurityRole } from "@ordella/security";

export type AuthenticatedGatewayUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  permissions?: string[];
};
