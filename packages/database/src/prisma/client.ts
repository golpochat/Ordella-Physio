import type { PrismaClient } from "@prisma/client";
import { normalizeDbError } from "../utils/normalize-error";

type PrismaQueryEvent = {
  duration: number;
  target: string;
};

type PrismaLogEvent = {
  message: string;
};
export type PrismaClientLike = {
  $connect: () => Promise<void>;
  $disconnect: () => Promise<void>;
  $transaction: PrismaClient["$transaction"];
  $extends: PrismaClient["$extends"];
  $on?: PrismaClient["$on"];
};

export type PrismaClientFactory<TClient extends PrismaClientLike> = () => TClient;

export type PrismaClientWrapperOptions<TClient extends PrismaClientLike> = {
  factory: PrismaClientFactory<TClient>;
  enableQueryTiming?: boolean;
  logQueries?: boolean;
  onQuery?: (event: QueryLogEvent) => void;
  onError?: (error: unknown) => void;
};

export type QueryLogEvent = {
  model?: string;
  action: string;
  durationMs: number;
  timestamp: string;
};

export class PrismaClientWrapper<TClient extends PrismaClientLike = PrismaClient> {
  private client: TClient | undefined;
  private connecting: Promise<TClient> | undefined;

  constructor(private readonly options: PrismaClientWrapperOptions<TClient>) {}

  async getClient(): Promise<TClient> {
    if (this.client) {
      return this.client;
    }

    if (this.connecting) {
      return this.connecting;
    }

    this.connecting = this.initialize().finally(() => {
      this.connecting = undefined;
    });

    return this.connecting;
  }

  async connect(): Promise<TClient> {
    return this.getClient();
  }

  async disconnect(): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client.$disconnect();
    this.client = undefined;
  }

  private async initialize(): Promise<TClient> {
    const client = this.options.factory();
    this.attachLogging(client);
    await client.$connect();
    this.client = client;
    return client;
  }

  private attachLogging(client: TClient): void {
    if (!this.options.enableQueryTiming && !this.options.logQueries) {
      return;
    }

    if (!client.$on) {
      return;
    }

    client.$on("query" as never, (event: PrismaQueryEvent) => {
      const payload: QueryLogEvent = {
        model: event.target,
        action: "query",
        durationMs: event.duration,
        timestamp: new Date().toISOString(),
      };

      if (this.options.logQueries) {
        console.info(`[prisma] ${payload.model ?? "unknown"} ${payload.durationMs}ms`);
      }

      this.options.onQuery?.(payload);
    });

    client.$on("error" as never, (event: PrismaLogEvent) => {
      const error = new Error(event.message);
      this.options.onError?.(error);
      if (this.options.logQueries) {
        console.error("[prisma:error]", normalizeDbError(error));
      }
    });
  }
}

let defaultWrapper: PrismaClientWrapper | undefined;

export function createPrismaClientWrapper<TClient extends PrismaClientLike>(
  options: PrismaClientWrapperOptions<TClient>,
): PrismaClientWrapper<TClient> {
  return new PrismaClientWrapper(options);
}

export function getDefaultPrismaClientWrapper(): PrismaClientWrapper {
  if (!defaultWrapper) {
    throw new Error("Default Prisma client wrapper is not configured");
  }

  return defaultWrapper;
}

export function setDefaultPrismaClientWrapper(wrapper: PrismaClientWrapper): void {
  defaultWrapper = wrapper;
}
