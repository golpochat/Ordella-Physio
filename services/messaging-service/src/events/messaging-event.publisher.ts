import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { MESSAGING_EVENTS } from "@/constants";
import type { ConversationCreatedEvent } from "@/messaging/events/conversation-created.event";
import type { MessageCreatedEvent } from "@/messaging/events/message-created.event";
import type { MessageReadEvent } from "@/messaging/events/message-read.event";
import type { TypingEvent } from "@/messaging/events/typing.event";

@Injectable()
export class MessagingEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MessagingEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Messaging event publisher connected to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  private async publish<T>(subject: string, tenantId: string, payload: T, correlationId?: string) {
    if (!this.eventBus) {
      this.logger.warn(`Event bus unavailable, skipped publish: ${subject}`);
      return;
    }

    await this.eventBus.publish(toSubject(subject), payload, { tenantId, correlationId });
    this.logger.log(`Published ${subject} for tenant ${tenantId}`);
  }

  async publishConversationCreated(event: ConversationCreatedEvent, correlationId?: string) {
    await this.publish(MESSAGING_EVENTS.CONVERSATION_CREATED, event.tenantId, event, correlationId);
  }

  async publishMessageCreated(event: MessageCreatedEvent, correlationId?: string) {
    await this.publish(MESSAGING_EVENTS.MESSAGE_CREATED, event.tenantId, event, correlationId);
  }

  async publishMessageRead(event: MessageReadEvent, correlationId?: string) {
    await this.publish(MESSAGING_EVENTS.MESSAGE_READ, event.tenantId, event, correlationId);
  }

  async publishTyping(event: TypingEvent, correlationId?: string) {
    await this.publish(MESSAGING_EVENTS.TYPING, event.tenantId, event, correlationId);
  }
}
