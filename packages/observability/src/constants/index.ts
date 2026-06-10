export const DEFAULT_METRIC_BUCKETS = [
  0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10,
] as const;

export const DEFAULT_LOG_LEVEL = "info";

export const TRACE_HEADER = "x-trace-id";
export const CORRELATION_HEADER = "x-correlation-id";

export const DEFAULT_SERVICE_NAME = "ordella-service";
export const DEFAULT_SERVICE_VERSION = "0.0.0";
export const DEFAULT_DEPLOYMENT_ENVIRONMENT = "development";

export const METRIC_NAMES = {
  HTTP_REQUEST_DURATION: "http_request_duration_seconds",
  HTTP_REQUEST_TOTAL: "http_request_total",
  SERVICE_UPTIME: "service_uptime_seconds",
  EVENT_BUS_MESSAGES: "event_bus_messages_total",
} as const;

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];
