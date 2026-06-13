export type AccessPolicyRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  allowedRoles: string[];
  allowedUsers: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export function toAccessPolicyRecord(row: {
  id: string;
  tenantId: string;
  modelId: string;
  allowedRoles: unknown;
  allowedUsers: unknown;
  createdAt: Date;
  updatedAt: Date;
}): AccessPolicyRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    modelId: row.modelId,
    allowedRoles: Array.isArray(row.allowedRoles) ? (row.allowedRoles as string[]) : [],
    allowedUsers: Array.isArray(row.allowedUsers) ? (row.allowedUsers as string[]) : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
