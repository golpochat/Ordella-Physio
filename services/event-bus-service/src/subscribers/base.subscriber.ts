import type { Event, EventBus, MessageHandler } from "@ordella/event-bus";
import type { EventMetadata } from "@ordella/event-bus";
import { CONSUMER_DEFAULTS } from "@/constants";
import { matchesTenantFilter } from "@/utils/event-helpers";

export type BaseSubscriberOptions = {
  eventBus: EventBus;
  subject: string;
  durableName: string;
  queueGroup?: string;
  tenantId?: string;
};

export abstract class BaseSubscriber<TPayload extends Record<string, unknown>> {
  protected readonly eventBus: EventBus;
  protected readonly subject: string;
  protected readonly durableName: string;
  protected readonly queueGroup: string;
  protected readonly tenantFilter?: string;

  constructor(options: BaseSubscriberOptions) {
    this.eventBus = options.eventBus;
    this.subject = options.subject;
    this.durableName = options.durableName;
    this.queueGroup = options.queueGroup ?? CONSUMER_DEFAULTS.QUEUE_GROUP;
    this.tenantFilter = options.tenantId;
  }

  abstract onMessage(event: Event<TPayload>, metadata: EventMetadata): Promise<void>;

  async start(): Promise<void> {
    const handler: MessageHandler<TPayload> = async (event, metadata) => {
      if (!matchesTenantFilter(this.tenantFilter, event.tenantId)) {
        metadata.ack();
        return;
      }

      await this.onMessage(event, metadata);
    };

    await this.eventBus.subscribe(this.subject, handler, {
      durableName: this.durableName,
      queueGroup: this.queueGroup,
      maxDeliver: CONSUMER_DEFAULTS.MAX_DELIVER,
      ackWaitMs: CONSUMER_DEFAULTS.ACK_WAIT_MS,
    });
  }
}
