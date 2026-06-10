import type { SecurityRole } from "@ordella/security";

export type AuthenticatedNotificationUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole | string;
  email?: string;
  permissions?: string[];
};

export function isSystemSupportMode(user: AuthenticatedNotificationUser): boolean {
  return user.role === "SYSTEM";
}
