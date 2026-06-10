import { DomainEvent } from "../core/domain-event";

export type UserCreatedPayload = {
  userId: string;
  tenantId: string;
  email: string;
  role: string;
};

export class UserCreated extends DomainEvent<UserCreatedPayload> {
  constructor(payload: UserCreatedPayload, correlationId?: string) {
    super({
      eventName: "user.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type UserUpdatedPayload = {
  userId: string;
  tenantId: string;
  changes: Record<string, unknown>;
};

export class UserUpdated extends DomainEvent<UserUpdatedPayload> {
  constructor(payload: UserUpdatedPayload, correlationId?: string) {
    super({
      eventName: "user.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
