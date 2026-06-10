import type { MetricsRegistry } from "./prometheus";

export function incrementEventBusMessages(
  registry: MetricsRegistry,
  eventName: string,
  direction: "published" | "consumed",
): void {
  registry.eventBusMessagesTotal.inc({
    service: registry.serviceName,
    event_name: eventName,
    direction,
  });
}

export function recordHttpRequest(
  registry: MetricsRegistry,
  labels: {
    method: string;
    route: string;
    statusCode: number;
    durationSeconds: number;
  },
): void {
  const commonLabels = {
    method: labels.method,
    route: labels.route,
    status_code: String(labels.statusCode),
    service: registry.serviceName,
  };

  registry.httpRequestTotal.inc(commonLabels);
  registry.httpRequestDuration.observe(commonLabels, labels.durationSeconds);
}
