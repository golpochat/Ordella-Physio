import { createHash, randomBytes } from "crypto";

export type AuthenticatedEnterpriseUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
};

export function maskSecret(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.length <= 8) return "****";
  return `${value.slice(0, 4)}****${value.slice(-4)}`;
}

export function generateApiKey(): { rawKey: string; prefix: string; hash: string } {
  const rawKey = `ord_${randomBytes(32).toString("hex")}`;
  const prefix = rawKey.slice(0, 12);
  const hash = createHash("sha256").update(rawKey).digest("hex");
  return { rawKey, prefix, hash };
}

export function hashApiKey(rawKey: string): string {
  return createHash("sha256").update(rawKey).digest("hex");
}

export function signWebhookPayload(secret: string, payload: string, timestamp: number): string {
  return createHash("sha256").update(`${timestamp}.${payload}`).update(secret).digest("hex");
}

export function resolveInheritedPermissions(
  permissions: string[],
  parentPermissions: string[] = [],
): string[] {
  return [...new Set([...parentPermissions, ...permissions])];
}
