import { DomainEvent, type DomainEventProps } from "../core/domain-event";

export type CreateDomainEventInput<TPayload extends Record<string, unknown>> = Omit<
  DomainEventProps<TPayload>,
  "occurredAt"
> & {
  occurredAt?: Date;
};

export function createDomainEvent<TPayload extends Record<string, unknown>>(
  props: CreateDomainEventInput<TPayload>,
): DomainEvent<TPayload> {
  return new (class extends DomainEvent<TPayload> {
    constructor(input: CreateDomainEventInput<TPayload>) {
      super(input);
    }
  })(props);
}

export function createEventPayload<T extends Record<string, unknown>>(payload: T): T {
  return Object.freeze({ ...payload });
}

export function withTenantContext<T extends Record<string, unknown>>(
  tenantId: string,
  payload: T,
): T & { tenantId: string } {
  return Object.freeze({ ...payload, tenantId });
}
