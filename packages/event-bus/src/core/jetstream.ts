import {
  AckPolicy,
  type ConsumerConfig,
  type JetStreamClient,
  type JetStreamManager,
  type NatsConnection,
} from "nats";
import { buildStreamConfig, DEFAULT_CONSUMER_CONFIG, type StreamConfigOverrides } from "../constants/stream-config";

export class JetStreamWrapper {
  private jetstream: JetStreamClient | undefined;
  private manager: JetStreamManager | undefined;

  async init(connection: NatsConnection): Promise<void> {
    this.jetstream = connection.jetstream();
    this.manager = await connection.jetstreamManager();
  }

  getJetStream(): JetStreamClient {
    if (!this.jetstream) {
      throw new Error("JetStream client is not initialized");
    }

    return this.jetstream;
  }

  getManager(): JetStreamManager {
    if (!this.manager) {
      throw new Error("JetStream manager is not initialized");
    }

    return this.manager;
  }

  async ensureStream(overrides?: StreamConfigOverrides): Promise<void> {
    const manager = this.getManager();
    const config = buildStreamConfig(overrides);

    try {
      await manager.streams.info(config.name!);
    } catch {
      await manager.streams.add(config);
    }
  }

  async ensureConsumer(
    streamName: string,
    durableName: string,
    subject: string,
    overrides?: Partial<ConsumerConfig>,
  ): Promise<void> {
    const manager = this.getManager();

    try {
      await manager.consumers.info(streamName, durableName);
    } catch {
      await manager.consumers.add(streamName, {
        durable_name: durableName,
        filter_subject: subject,
        ack_policy: AckPolicy.Explicit,
        ...DEFAULT_CONSUMER_CONFIG,
        ...overrides,
      });
    }
  }
}

export function createJetStreamWrapper(): JetStreamWrapper {
  return new JetStreamWrapper();
}
