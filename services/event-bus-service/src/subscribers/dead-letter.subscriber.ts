import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import type { Event } from "@ordella/event-bus";
import type { EventMetadata } from "@ordella/event-bus";
import { NatsService } from "@/nats/nats.service";
import { DeadLetterService } from "@/dead-letter/dead-letter.service";
import { BaseSubscriber } from "@/subscribers/base.subscriber";
import { DEAD_LETTER_STREAM_CONFIG } from "@/streams/stream.config";

@Injectable()
export class DeadLetterSubscriber implements OnModuleInit {
  private readonly logger = new Logger(DeadLetterSubscriber.name);

  constructor(
    private readonly natsService: NatsService,
    private readonly deadLetterService: DeadLetterService,
  ) {}

  async onModuleInit() {
    const subscriber = new DeadLetterEventSubscriber({
      eventBus: this.natsService.getEventBus(),
      subject: DEAD_LETTER_STREAM_CONFIG.subjects[0]!,
      durableName: "event-bus-dlq-consumer",
      deadLetterService: this.deadLetterService,
      logger: this.logger,
    });

    await subscriber.start();
    this.logger.log("Dead-letter subscriber started");
  }
}

type DeadLetterEventSubscriberDeps = {
  eventBus: ReturnType<NatsService["getEventBus"]>;
  subject: string;
  durableName: string;
  deadLetterService: DeadLetterService;
  logger: Logger;
};

class DeadLetterEventSubscriber extends BaseSubscriber<Record<string, unknown>> {
  private readonly deadLetterService: DeadLetterService;
  private readonly logger: Logger;

  constructor(deps: DeadLetterEventSubscriberDeps) {
    super({
      eventBus: deps.eventBus,
      subject: deps.subject,
      durableName: deps.durableName,
    });
    this.deadLetterService = deps.deadLetterService;
    this.logger = deps.logger;
  }

  async onMessage(event: Event<Record<string, unknown>>, metadata: EventMetadata): Promise<void> {
    await this.deadLetterService.store({
      stream: metadata.stream ?? DEAD_LETTER_STREAM_CONFIG.name,
      subject: event.subject,
      tenantId: event.tenantId,
      payload: event.payload,
      reason: "Routed to dead-letter queue",
    });

    this.logger.debug(`Stored DLQ event ${event.subject} for tenant ${event.tenantId}`);
    metadata.ack();
  }
}
