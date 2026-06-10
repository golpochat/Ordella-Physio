import {
  connect,
  type ConnectionOptions,
  type NatsConnection,
} from "nats";

export type NatsConnectionConfig = {
  url?: string;
  user?: string;
  password?: string;
  name?: string;
  maxReconnectAttempts?: number;
  reconnectTimeWaitMs?: number;
};

function configFromEnv(): NatsConnectionConfig {
  return {
    url: process.env.NATS_URL ?? "nats://localhost:4222",
    user: process.env.NATS_USER,
    password: process.env.NATS_PASSWORD,
    name: process.env.NATS_CLIENT_NAME,
  };
}

export class NatsConnectionManager {
  private static instance: NatsConnectionManager | undefined;
  private connection: NatsConnection | undefined;
  private connecting: Promise<NatsConnection> | undefined;

  static getInstance(): NatsConnectionManager {
    if (!NatsConnectionManager.instance) {
      NatsConnectionManager.instance = new NatsConnectionManager();
    }

    return NatsConnectionManager.instance;
  }

  async connect(config: NatsConnectionConfig = configFromEnv()): Promise<NatsConnection> {
    if (this.connection && !this.connection.isClosed()) {
      return this.connection;
    }

    if (this.connecting) {
      return this.connecting;
    }

    const options: ConnectionOptions = {
      servers: config.url,
      name: config.name ?? "ordella-event-bus",
      maxReconnectAttempts: config.maxReconnectAttempts ?? -1,
      reconnectTimeWait: config.reconnectTimeWaitMs ?? 2000,
      ...(config.user ? { user: config.user } : {}),
      ...(config.password ? { pass: config.password } : {}),
    };

    this.connecting = connect(options).then((connection) => {
      this.connection = connection;
      this.connecting = undefined;
      return connection;
    });

    return this.connecting;
  }

  getConnection(): NatsConnection {
    if (!this.connection || this.connection.isClosed()) {
      throw new Error("NATS connection is not established. Call connect() first.");
    }

    return this.connection;
  }

  isConnected(): boolean {
    return Boolean(this.connection && !this.connection.isClosed());
  }

  async disconnect(): Promise<void> {
    if (!this.connection || this.connection.isClosed()) {
      return;
    }

    await this.connection.drain();
    await this.connection.close();
    this.connection = undefined;
  }
}

export function getNatsConnectionManager(): NatsConnectionManager {
  return NatsConnectionManager.getInstance();
}
