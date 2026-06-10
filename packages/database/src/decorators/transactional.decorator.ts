export const TRANSACTIONAL_METADATA = "ordella:transactional";

export type TransactionalMetadata = {
  tenantAware?: boolean;
  tenantArgIndex?: number;
};
