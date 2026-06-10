import {
  AckPolicy,
  headers as natsHeaders,
  StringCodec,
  type ConsumerMessages,
  type JetStreamSubscription,
  type JsMsg,
} from "nats";
import { STREAM_NAME, toDeadLetterSubject } from "../constants/subjects";
import type {
  MessageHandler,
  PublishMetadata,
  RequestOptions,
  SubscribeOptions,
} from "../types/event";
import type { EventMetadata } from "../types/event-metadata";
import { encodeEvent, parseEvent } from "../utils/serializer";
import { retry } from "../utils/retry";
import { getNatsConnectionManager } from "./nats-connection";
import { createJetStreamWrapper, type JetStreamWrapper } from "./jetstream";

const codec = StringCodec();

export type EventBusOptions = {
  streamName?: string;
  autoCreateStream?: boolean;
};

export class EventBus {
  private readonly streamName: string;
  private readonly autoCreateStream: boolean;
  private jetStreamWrapper: JetStreamWrapper;
  private subscriptions: Array<{ drain: () => Promise<void> }> = [];
  private initialized = false;

  constructor(options: EventBusOptions = {}) {
    this.streamName = options.streamName ?? STREAM_NAME;
    this.autoCreateStream = options.autoCreateStream !== false;
    this.jetStreamWrapper = createJetStreamWrapper();
  }

  async connect(): Promise<void> {
    const connection = await getNatsConnectionManager().connect();
    await this.jetStreamWrapper.init(connection);

    if (this.autoCreateStream) {
      await this.jetStreamWrapper.ensureStream({ name: this.streamName });
    }

    this.initialized = true;
  }

  async publish<TPayload>(
    subject: string,
    payload: TPayload,
    metadata: PublishMetadata = {},
  ): Promise<void> {
    await this.ensureInitialized();
    const jetstream = this.jetStreamWrapper.getJetStream();
    const data = encodeEvent(subject, payload, metadata);
    const hdrs = natsHeaders();

    if (metadata.correlationId) {
      hdrs.set("correlation-id", metadata.correlationId);
    }

    for (const [key, value] of Object.entries(metadata.headers ?? {})) {
      hdrs.set(key, value);
    }

    await jetstream.publish(subject, data, { headers: hdrs });
  }

  async subscribe<TPayload>(
    subject: string,
    handler: MessageHandler<TPayload>,
    options: SubscribeOptions = {},
  ): Promise<JetStreamSubscription> {
    await this.ensureInitialized();

    const durableName = options.durableName ?? `${subject.replace(/\./g, "_")}_consumer`;

    await this.jetStreamWrapper.ensureConsumer(this.streamName, durableName, subject, {
      durable_name: durableName,
      filter_subject: subject,
      ack_policy: AckPolicy.Explicit,
      max_deliver: options.maxDeliver,
      ack_wait: options.ackWaitMs ? options.ackWaitMs * 1_000_000 : undefined,
    });

    const jetstream = this.jetStreamWrapper.getJetStream();
    const consumer = await jetstream.consumers.get(this.streamName, durableName);
    const messages = await consumer.consume();

    void this.consumePullMessages(messages, handler, options);
    this.subscriptions.push({
      drain: async () => {
        messages.close();
      },
    });

    return messages as unknown as JetStreamSubscription;
  }

  private async consumePullMessages<TPayload>(
    messages: ConsumerMessages,
    handler: MessageHandler<TPayload>,
    options: SubscribeOptions,
  ): Promise<void> {
    for await (const message of messages) {
      await this.handleMessage(message, handler, options);
    }
  }

  async request<TRequest, TResponse>(
    subject: string,
    payload: TRequest,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    await this.ensureInitialized();
    const connection = getNatsConnectionManager().getConnection();
    const data = encodeEvent(subject, payload);
    const timeout = options.timeoutMs ?? 5000;
    const hdrs = natsHeaders();

    for (const [key, value] of Object.entries(options.headers ?? {})) {
      hdrs.set(key, value);
    }

    const response = await connection.request(subject, data, {
      timeout,
      headers: hdrs,
    });

    return JSON.parse(codec.decode(response.data)) as TResponse;
  }

  async shutdown(): Promise<void> {
    for (const subscription of this.subscriptions) {
      await subscription.drain();
    }

    this.subscriptions = [];
    await getNatsConnectionManager().disconnect();
    this.initialized = false;
  }

  private async handleMessage<TPayload>(
    message: JsMsg,
    handler: MessageHandler<TPayload>,
    options: SubscribeOptions,
  ): Promise<void> {
    const event = parseEvent<TPayload>(message.data);
    const metadata = this.buildMetadata(message);

    try {
      await retry(() => handler(event, metadata), options.maxDeliver ?? 3, 250);
      metadata.ack();
    } catch (error) {
      if ((metadata.redeliveryCount ?? 0) >= (options.maxDeliver ?? 5)) {
        await this.publishDeadLetter(options.deadLetterSubject ?? toDeadLetterSubject(event.subject), {
          event,
          error: error instanceof Error ? error.message : "Handler failed",
        });
        metadata.term();
        return;
      }

      metadata.nak(1000);
    }
  }

  private buildMetadata(message: JsMsg): EventMetadata {
    return {
      stream: message.info.stream,
      sequence: message.info.streamSequence,
      redeliveryCount: message.info.redeliveryCount,
      correlationId: message.headers?.get("correlation-id") ?? undefined,
      ack: () => {
        message.ack();
      },
      nak: (delayMs = 1000) => {
        message.nak(delayMs);
      },
      term: () => {
        message.term();
      },
    };
  }

  private async publishDeadLetter(subject: string, payload: unknown): Promise<void> {
    await this.publish(subject, payload, { tenantId: "system" });
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.connect();
    }
  }
}

export function createEventBus(options?: EventBusOptions): EventBus {
  return new EventBus(options);
}
