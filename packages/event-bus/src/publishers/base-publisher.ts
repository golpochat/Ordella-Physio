import type { EventBus } from "../core/event-bus";
import type { PublishMetadata } from "../types/event";
import { serializeEvent } from "../utils/serializer";

export type BasePublisherOptions = {
  eventBus: EventBus;
  subject: string;
  defaultMetadata?: PublishMetadata;
};

export abstract class BasePublisher<TPayload> {
  protected readonly eventBus: EventBus;
  protected readonly subject: string;
  protected readonly defaultMetadata: PublishMetadata;

  constructor(options: BasePublisherOptions) {
    this.eventBus = options.eventBus;
    this.subject = options.subject;
    this.defaultMetadata = options.defaultMetadata ?? {};
  }

  getSubject(): string {
    return this.subject;
  }

  async publish(data: TPayload, metadata: PublishMetadata = {}): Promise<void> {
    const mergedMetadata = {
      ...this.defaultMetadata,
      ...metadata,
      tenantId: metadata.tenantId ?? this.defaultMetadata.tenantId ?? serializeEvent(this.subject, data).tenantId,
    };

    serializeEvent(this.subject, data, mergedMetadata);
    await this.eventBus.publish(this.subject, data, mergedMetadata);
  }
}
