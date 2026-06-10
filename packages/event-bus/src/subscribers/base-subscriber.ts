import type { EventBus } from "../core/event-bus";
import { toDeadLetterSubject } from "../constants/subjects";
import type { Event, MessageHandler, SubscribeOptions } from "../types/event";
import type { EventMetadata } from "../types/event-metadata";
import { retry } from "../utils/retry";

export type BaseSubscriberOptions = {
  eventBus: EventBus;
  subject: string;
  durableName: string;
  queueGroup?: string;
  maxDeliver?: number;
  ackWaitMs?: number;
  deadLetterSubject?: string;
};

export abstract class BaseSubscriber<TPayload> {
  protected readonly eventBus: EventBus;
  protected readonly subject: string;
  protected readonly durableName: string;
  protected readonly queueGroup: string;
  protected readonly subscribeOptions: SubscribeOptions;

  constructor(options: BaseSubscriberOptions) {
    this.eventBus = options.eventBus;
    this.subject = options.subject;
    this.durableName = options.durableName;
    this.queueGroup = options.queueGroup ?? "ordella-workers";
    this.subscribeOptions = {
      durableName: options.durableName,
      queueGroup: options.queueGroup,
      maxDeliver: options.maxDeliver ?? 5,
      ackWaitMs: options.ackWaitMs ?? 30_000,
      deadLetterSubject: options.deadLetterSubject ?? toDeadLetterSubject(options.subject),
    };
  }

  abstract onMessage(event: Event<TPayload>, metadata: EventMetadata): Promise<void>;

  async start(): Promise<void> {
    await this.eventBus.subscribe<TPayload>(
      this.subject,
      async (event, metadata) => {
        await retry(
          () => this.onMessage(event, metadata),
          this.subscribeOptions.maxDeliver ?? 3,
          250,
        );
      },
      this.subscribeOptions,
    );
  }
}

export type SubscriberHandler<TPayload> = MessageHandler<TPayload>;
