import { connect, type NatsConnection } from "nats";
import { eventBusConfig } from "@ordella/config";

export async function createNatsConnection(): Promise<NatsConnection> {
  return connect({
    servers: eventBusConfig.natsUrl,
    name: "ordella-event-bus-service",
    maxReconnectAttempts: -1,
    reconnectTimeWait: 2_000,
  });
}
