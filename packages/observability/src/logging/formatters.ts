import type { LogLevel } from "../constants";

export type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: string;
  service?: string;
  correlationId?: string;
  traceId?: string;
  metadata?: Record<string, unknown>;
};

export type FormatLogOptions = {
  pretty?: boolean;
  service?: string;
};

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export function shouldLog(current: LogLevel, target: LogLevel): boolean {
  return LEVEL_ORDER[target] >= LEVEL_ORDER[current];
}

export function formatJsonLog(entry: LogEntry): string {
  return JSON.stringify(entry);
}

export function formatPrettyLog(entry: LogEntry): string {
  const meta =
    entry.metadata && Object.keys(entry.metadata).length > 0
      ? ` ${JSON.stringify(entry.metadata)}`
      : "";
  const correlation = entry.correlationId ? ` correlation=${entry.correlationId}` : "";
  const trace = entry.traceId ? ` trace=${entry.traceId}` : "";

  return `[${entry.timestamp}] ${entry.level.toUpperCase()}${correlation}${trace} ${entry.message}${meta}`;
}

export function formatLogEntry(entry: LogEntry, options: FormatLogOptions = {}): string {
  if (options.pretty) {
    return formatPrettyLog({ ...entry, service: entry.service ?? options.service });
  }

  return formatJsonLog({ ...entry, service: entry.service ?? options.service });
}
