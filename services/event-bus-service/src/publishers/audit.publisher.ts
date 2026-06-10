import { Injectable } from "@nestjs/common";
import { AUDIT_EVENTS } from "@/constants";
import { EventPublisher } from "@/publishers/event.publisher";
import type { PublishMetadataInput } from "@/utils/metadata-helpers";

export type AuditEventPayload = {
  action: string;
  actorId?: string;
  resourceType: string;
  resourceId: string;
  details?: Record<string, unknown>;
};

@Injectable()
export class AuditPublisher {
  constructor(private readonly eventPublisher: EventPublisher) {}

  async publishAuditLogged(
    tenantId: string,
    payload: AuditEventPayload,
    metadata?: Partial<PublishMetadataInput>,
  ): Promise<void> {
    await this.eventPublisher.publishDomainEvent(
      AUDIT_EVENTS.AUDIT_LOGGED,
      { ...payload, tenantId },
      { tenantId, ...metadata },
    );
  }
}
