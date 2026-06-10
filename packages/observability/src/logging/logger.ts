import { DEFAULT_LOG_LEVEL, type LogLevel } from "../constants";
import { formatLogEntry, shouldLog, type LogEntry } from "./formatters";
import {
  createConsoleTransport,
  type LogTransport,
} from "./transports";

export type LoggerContext = {
  correlationId?: string;
  traceId?: string;
  metadata?: Record<string, unknown>;
};

export type LoggerOptions = {
  service?: string;
  level?: LogLevel;
  pretty?: boolean;
  transports?: LogTransport[];
  defaultMetadata?: Record<string, unknown>;
};

export class Logger {
  private readonly service?: string;
  private readonly level: LogLevel;
  private readonly pretty: boolean;
  private readonly transports: LogTransport[];
  private readonly defaultMetadata: Record<string, unknown>;
  private context: LoggerContext = {};

  constructor(options: LoggerOptions = {}) {
    this.service = options.service;
    this.level = options.level ?? DEFAULT_LOG_LEVEL;
    this.pretty = options.pretty ?? process.env.NODE_ENV === "development";
    this.transports = options.transports ?? [createConsoleTransport()];
    this.defaultMetadata = options.defaultMetadata ?? {};
  }

  child(context: LoggerContext): Logger {
    const child = new Logger({
      service: this.service,
      level: this.level,
      pretty: this.pretty,
      transports: this.transports,
      defaultMetadata: {
        ...this.defaultMetadata,
        ...this.context.metadata,
        ...context.metadata,
      },
    });

    child.context = {
      ...this.context,
      ...context,
    };

    return child;
  }

  setContext(context: LoggerContext): void {
    this.context = { ...this.context, ...context };
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    this.write("debug", message, metadata);
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.write("info", message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.write("warn", message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    this.write("error", message, metadata);
  }

  private write(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    if (!shouldLog(this.level, level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      service: this.service,
      correlationId: this.context.correlationId,
      traceId: this.context.traceId,
      metadata: {
        ...this.defaultMetadata,
        ...this.context.metadata,
        ...metadata,
      },
    };

    const output = formatLogEntry(entry, {
      pretty: this.pretty,
      service: this.service,
    });

    for (const transport of this.transports) {
      transport.write(output, entry);
    }
  }
}

let defaultLogger: Logger | undefined;

export function createLogger(options?: LoggerOptions): Logger {
  return new Logger(options);
}

export function getLogger(): Logger {
  if (!defaultLogger) {
    defaultLogger = createLogger();
  }

  return defaultLogger;
}

export function setDefaultLogger(logger: Logger): void {
  defaultLogger = logger;
}
