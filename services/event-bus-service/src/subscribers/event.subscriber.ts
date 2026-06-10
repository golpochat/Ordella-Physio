import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import type { Event } from "@ordella/event-bus";
import type { EventMetadata } from "@ordella/event-bus";
import { NatsService } from "@/nats/nats.service";
import { SchemaRegistry } from "@/schemas/schema.registry";
import { BaseSubscriber } from "@/subscribers/base.subscriber";
import { DeadLetterService } from "@/dead-letter/dead-letter.service";
import { stripSubjectPrefix } from "@/utils/event-helpers";

@Injectable()
export class EventSubscriber implements OnModuleInit {
  private readonly logger = new Logger(EventSubscriber.name);

  constructor(
    private readonly natsService: NatsService,
    private readonly schemaRegistry: SchemaRegistry,
    private readonly deadLetterService: DeadLetterService,
  ) {}

  async onModuleInit() {
    const subscriber = new DomainEventSubscriber({
      eventBus: this.natsService.getEventBus(),
      subject: "ordella.events.>",
      durableName: "event-bus-domain-consumer",
      schemaRegistry: this.schemaRegistry,
      deadLetterService: this.deadLetterService,
      logger: this.logger,
    });

    await subscriber.start();
    this.logger.log("Domain event subscriber started");
  }
}

type DomainEventSubscriberDeps = {
  eventBus: ReturnType<NatsService["getEventBus"]>;
  subject: string;
  durableName: string;
  schemaRegistry: SchemaRegistry;
  deadLetterService: DeadLetterService;
  logger: Logger;
};

class DomainEventSubscriber extends BaseSubscriber<Record<string, unknown>> {
  private readonly schemaRegistry: SchemaRegistry;
  private readonly deadLetterService: DeadLetterService;
  private readonly logger: Logger;

  constructor(deps: DomainEventSubscriberDeps) {
    super({
      eventBus: deps.eventBus,
      subject: deps.subject,
      durableName: deps.durableName,
    });
    this.schemaRegistry = deps.schemaRegistry;
    this.deadLetterService = deps.deadLetterService;
    this.logger = deps.logger;
  }

  async onMessage(event: Event<Record<string, unknown>>, metadata: EventMetadata): Promise<void> {
    const eventName = stripSubjectPrefix(event.subject);
    const validation = this.schemaRegistry.validate(eventName, event.payload);

    if (!validation.valid) {
      await this.deadLetterService.store({
        stream: metadata.stream ?? "unknown",
        subject: event.subject,
        tenantId: event.tenantId,
        payload: event.payload,
        reason: validation.reason ?? "Schema validation failed",
      });
      metadata.term();
      return;
    }

    this.logger.debug(`Validated event ${eventName} for tenant ${event.tenantId}`);
    metadata.ack();
  }
}
