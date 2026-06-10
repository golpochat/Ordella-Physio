import { DomainEvent } from "../core/domain-event";

export type TenantCreatedPayload = {
  tenantId: string;
  name: string;
  slug: string;
};

export class TenantCreated extends DomainEvent<TenantCreatedPayload> {
  constructor(payload: TenantCreatedPayload, correlationId?: string) {
    super({
      eventName: "tenant.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type TenantUpdatedPayload = {
  tenantId: string;
  changes: Record<string, unknown>;
};

export class TenantUpdated extends DomainEvent<TenantUpdatedPayload> {
  constructor(payload: TenantUpdatedPayload, correlationId?: string) {
    super({
      eventName: "tenant.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
