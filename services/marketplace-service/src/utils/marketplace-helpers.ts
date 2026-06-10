import type { SecurityRole } from "@ordella/security";

export type AuthenticatedMarketplaceUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole | string;
  email?: string;
  permissions?: string[];
};

export function maskSecret(value?: string | null) {
  if (!value) return null;
  if (value.length <= 8) return "********";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}
