import type { SecurityRole } from "@ordella/security";

export type AuthenticatedMessagingUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole | string;
  email?: string;
  permissions?: string[];
};

export function isSystemSupportMode(user: AuthenticatedMessagingUser): boolean {
  return user.role === "SYSTEM";
}
