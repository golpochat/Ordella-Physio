export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: string;
  meta?: Record<string, unknown>;
};

export function formatLog(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>,
): string {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(meta ? { meta } : {}),
  };

  return JSON.stringify(entry);
}
