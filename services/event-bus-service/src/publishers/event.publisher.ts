import { Injectable } from "@nestjs/common";
import { toSubject } from "@ordella/event-bus";
import { NatsService } from "@/nats/nats.service";
import { BasePublisher } from "@/publishers/base.publisher";
import type { PublishMetadataInput } from "@/utils/metadata-helpers";

@Injectable()
export class EventPublisher {
  constructor(private readonly natsService: NatsService) {}

  async publishDomainEvent<TPayload extends Record<string, unknown>>(
    eventName: string,
    payload: TPayload,
    metadata: PublishMetadataInput,
  ): Promise<void> {
    const publisher = new DomainEventPublisher({
      eventBus: this.natsService.getEventBus(),
      subject: toSubject(eventName),
    });

    await publisher.publish(payload, metadata);
  }
}

class DomainEventPublisher extends BasePublisher<Record<string, unknown>> {
  async publish(payload: Record<string, unknown>, metadata: PublishMetadataInput): Promise<void> {
    await this.publishEvent(payload, metadata);
  }
}
