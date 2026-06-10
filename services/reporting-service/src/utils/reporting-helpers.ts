export type AuthenticatedReportingUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function buildCacheKey(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(":");
}

export function toDecimalString(value: number): string {
  return value.toFixed(2);
}
