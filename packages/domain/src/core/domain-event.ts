export type DomainEventProps<TPayload extends Record<string, unknown>> = {
  eventName: string;
  payload: TPayload;
  tenantId: string;
  correlationId?: string;
  occurredAt?: Date;
};

export abstract class DomainEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  readonly eventName: string;
  readonly payload: TPayload;
  readonly tenantId: string;
  readonly correlationId?: string;
  readonly occurredAt: Date;

  protected constructor(props: DomainEventProps<TPayload>) {
    this.eventName = props.eventName;
    this.payload = Object.freeze({ ...props.payload });
    this.tenantId = props.tenantId;
    this.correlationId = props.correlationId;
    this.occurredAt = props.occurredAt ?? new Date();
  }

  toObject() {
    return {
      eventName: this.eventName,
      payload: this.payload,
      tenantId: this.tenantId,
      correlationId: this.correlationId,
      occurredAt: this.occurredAt.toISOString(),
    };
  }
}
