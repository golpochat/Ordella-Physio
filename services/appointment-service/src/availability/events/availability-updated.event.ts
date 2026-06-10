export type AvailabilityUpdatedEvent = {
  tenantId: string;
  availabilityId: string;
  therapistId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
