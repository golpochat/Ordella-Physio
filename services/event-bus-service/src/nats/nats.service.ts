import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus } from "@ordella/event-bus";
import type { NatsConnection } from "nats";
import { createNatsConnection } from "@/nats/nats-connection.factory";
import { buildDomainStreamConfig } from "@/nats/nats-stream-builder";
import { DOMAIN_STREAM_DEFINITIONS } from "@/streams/stream.definitions";

@Injectable()
export class NatsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NatsService.name);
  private connection: NatsConnection | null = null;
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.connection = await createNatsConnection();
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    await this.ensureDomainStreams();
    this.logger.log("NATS JetStream connection established");
  }

  async onModuleDestroy() {
    await this.connection?.drain();
    await this.connection?.close();
    this.connection = null;
    this.eventBus = null;
  }

  getConnection(): NatsConnection {
    if (!this.connection) {
      throw new Error("NATS connection is not initialized");
    }

    return this.connection;
  }

  getEventBus(): EventBus {
    if (!this.eventBus) {
      throw new Error("Event bus is not initialized");
    }

    return this.eventBus;
  }

  private async ensureDomainStreams() {
    const manager = await this.getConnection().jetstreamManager();

    for (const definition of DOMAIN_STREAM_DEFINITIONS) {
      const config = buildDomainStreamConfig(definition);

      try {
        await manager.streams.info(config.name!);
        this.logger.debug(`Stream ${config.name} already exists`);
      } catch {
        await manager.streams.add(config);
        this.logger.log(`Created stream ${config.name}`);
      }
    }
  }
}
