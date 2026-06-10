export type DataIngestedEvent = {
  tenantId: string;
  sourceService: string;
  eventType: string;
  entityType: string;
  entityId: string;
  ingestedAt: string;
};
