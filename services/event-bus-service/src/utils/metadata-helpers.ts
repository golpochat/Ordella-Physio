import { EventMetadata } from "@ordella/domain";
import { DEFAULT_EVENT_VERSION } from "@/constants";

export type PublishMetadataInput = {
  tenantId: string;
  correlationId?: string;
  causationId?: string;
  version?: number;
};

export function buildEventMetadata(input: PublishMetadataInput): EventMetadata {
  return EventMetadata.create({
    tenantId: input.tenantId,
    correlationId: input.correlationId,
    causationId: input.causationId,
    timestamp: new Date().toISOString(),
    version: input.version ?? DEFAULT_EVENT_VERSION,
  });
}

export function metadataToHeaders(metadata: EventMetadata): Record<string, string> {
  return {
    "x-tenant-id": metadata.tenantId,
    "x-event-version": String(metadata.version),
    ...(metadata.correlationId ? { "correlation-id": metadata.correlationId } : {}),
    ...(metadata.causationId ? { "x-causation-id": metadata.causationId } : {}),
  };
}
