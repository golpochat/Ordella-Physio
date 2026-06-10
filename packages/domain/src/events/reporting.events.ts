import { DomainEvent } from "../core/domain-event";

export type MetricsGeneratedPayload = {
  tenantId: string;
  metricType: string;
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
};

export type DataIngestedPayload = {
  tenantId: string;
  sourceService: string;
  eventType: string;
  entityType: string;
  entityId: string;
  ingestedAt: string;
};

export class MetricsGenerated extends DomainEvent<MetricsGeneratedPayload> {
  constructor(payload: MetricsGeneratedPayload, correlationId?: string) {
    super({
      eventName: "metrics.generated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export class DataIngested extends DomainEvent<DataIngestedPayload> {
  constructor(payload: DataIngestedPayload, correlationId?: string) {
    super({
      eventName: "data.ingested",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
