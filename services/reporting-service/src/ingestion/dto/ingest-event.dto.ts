export type IngestEventDto = {
  sourceService: string;
  eventType: string;
  entityType: string;
  entityId: string;
  payload: Record<string, unknown>;
};
