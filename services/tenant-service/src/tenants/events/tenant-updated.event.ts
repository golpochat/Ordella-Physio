export type TenantUpdatedEvent = {
  tenantId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
