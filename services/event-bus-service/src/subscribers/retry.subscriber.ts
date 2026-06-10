import { Injectable, Logger } from "@nestjs/common";
import type { Event } from "@ordella/event-bus";
import type { EventMetadata } from "@ordella/event-bus";
import { BaseSubscriber } from "@/subscribers/base.subscriber";
import type { NatsService } from "@/nats/nats.service";

export type RetrySubscriberFactoryOptions = {
  natsService: NatsService;
  subject: string;
  durableName: string;
  onRetry: (event: Event<Record<string, unknown>>, metadata: EventMetadata) => Promise<void>;
};

@Injectable()
export class RetrySubscriber {
  private readonly logger = new Logger(RetrySubscriber.name);

  async createConsumer(options: RetrySubscriberFactoryOptions): Promise<void> {
    const subscriber = new RetryEventSubscriber({
      eventBus: options.natsService.getEventBus(),
      subject: options.subject,
      durableName: options.durableName,
      onRetry: options.onRetry,
      logger: this.logger,
    });

    await subscriber.start();
  }
}

type RetryEventSubscriberDeps = {
  eventBus: ReturnType<NatsService["getEventBus"]>;
  subject: string;
  durableName: string;
  onRetry: (event: Event<Record<string, unknown>>, metadata: EventMetadata) => Promise<void>;
  logger: Logger;
};

class RetryEventSubscriber extends BaseSubscriber<Record<string, unknown>> {
  private readonly onRetry: RetryEventSubscriberDeps["onRetry"];
  private readonly logger: Logger;

  constructor(deps: RetryEventSubscriberDeps) {
    super({
      eventBus: deps.eventBus,
      subject: deps.subject,
      durableName: deps.durableName,
    });
    this.onRetry = deps.onRetry;
    this.logger = deps.logger;
  }

  async onMessage(event: Event<Record<string, unknown>>, metadata: EventMetadata): Promise<void> {
    try {
      await this.onRetry(event, metadata);
      metadata.ack();
    } catch (error) {
      const redeliveryCount = metadata.redeliveryCount ?? 0;
      this.logger.warn(`Retry subscriber failed (attempt ${redeliveryCount + 1}): ${String(error)}`);
      metadata.nak(1_000);
    }
  }
}
