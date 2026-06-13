export type GatewayScope = "inference" | "training" | "datasets" | "embeddings";

export type GatewayKeyRecord = {
  id: string;
  tenantId: string;
  name: string;
  keyPrefix: string;
  scopes: GatewayScope[];
  rateLimitProfileId: string | null;
  budgetProfileId: string | null;
  isActive: boolean;
  isFlagged: boolean;
  isThrottled: boolean;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
};

export type ValidatedKeyContext = {
  keyId: string;
  tenantId: string;
  scopes: GatewayScope[];
  rateLimitProfileId: string | null;
  budgetProfileId: string | null;
  isThrottled: boolean;
};

export function toGatewayKeyRecord(row: {
  id: string;
  tenantId: string;
  name: string;
  keyPrefix: string;
  scopes: unknown;
  rateLimitProfileId: string | null;
  budgetProfileId: string | null;
  isActive: boolean;
  isFlagged: boolean;
  isThrottled: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
}): GatewayKeyRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    name: row.name,
    keyPrefix: row.keyPrefix,
    scopes: Array.isArray(row.scopes) ? (row.scopes as GatewayScope[]) : [],
    rateLimitProfileId: row.rateLimitProfileId,
    budgetProfileId: row.budgetProfileId,
    isActive: row.isActive,
    isFlagged: row.isFlagged,
    isThrottled: row.isThrottled,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
    revokedAt: row.revokedAt?.toISOString() ?? null,
  };
}
