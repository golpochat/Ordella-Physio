import {
  Counter,
  Gauge,
  Histogram,
  Registry,
  collectDefaultMetrics,
  type CounterConfiguration,
  type GaugeConfiguration,
  type HistogramConfiguration,
} from "prom-client";
import {
  DEFAULT_METRIC_BUCKETS,
  DEFAULT_SERVICE_NAME,
  METRIC_NAMES,
} from "../constants";

export type MetricsRegistryOptions = {
  serviceName?: string;
  prefix?: string;
  collectDefaultMetrics?: boolean;
};

export class MetricsRegistry {
  readonly registry: Registry;
  readonly serviceName: string;
  readonly prefix: string;

  readonly httpRequestDuration: Histogram<string>;
  readonly httpRequestTotal: Counter<string>;
  readonly serviceUptime: Gauge<string>;
  readonly eventBusMessagesTotal: Counter<string>;

  private uptimeInterval?: ReturnType<typeof setInterval>;
  private startedAt = Date.now();

  constructor(options: MetricsRegistryOptions = {}) {
    this.serviceName = options.serviceName ?? DEFAULT_SERVICE_NAME;
    this.prefix = options.prefix ?? "";
    this.registry = new Registry();

    if (options.collectDefaultMetrics !== false) {
      collectDefaultMetrics({ register: this.registry, prefix: this.prefix });
    }

    this.httpRequestDuration = this.createHistogram({
      name: `${this.prefix}${METRIC_NAMES.HTTP_REQUEST_DURATION}`,
      help: "Duration of HTTP requests in seconds",
      labelNames: ["method", "route", "status_code", "service"],
      buckets: [...DEFAULT_METRIC_BUCKETS],
    });

    this.httpRequestTotal = this.createCounter({
      name: `${this.prefix}${METRIC_NAMES.HTTP_REQUEST_TOTAL}`,
      help: "Total number of HTTP requests",
      labelNames: ["method", "route", "status_code", "service"],
    });

    this.serviceUptime = this.createGauge({
      name: `${this.prefix}${METRIC_NAMES.SERVICE_UPTIME}`,
      help: "Service uptime in seconds",
      labelNames: ["service"],
    });

    this.eventBusMessagesTotal = this.createCounter({
      name: `${this.prefix}${METRIC_NAMES.EVENT_BUS_MESSAGES}`,
      help: "Total number of event bus messages published or consumed",
      labelNames: ["service", "event_name", "direction"],
    });

    this.startUptimeCollector();
  }

  createCounter<T extends string = string>(config: CounterConfiguration<T>): Counter<T> {
    const counter = new Counter({ ...config, registers: [this.registry] });
    return counter;
  }

  createHistogram<T extends string = string>(config: HistogramConfiguration<T>): Histogram<T> {
    const histogram = new Histogram({ ...config, registers: [this.registry] });
    return histogram;
  }

  createGauge<T extends string = string>(config: GaugeConfiguration<T>): Gauge<T> {
    const gauge = new Gauge({ ...config, registers: [this.registry] });
    return gauge;
  }

  async metrics(): Promise<string> {
    return this.registry.metrics();
  }

  getContentType(): string {
    return this.registry.contentType;
  }

  stop(): void {
    if (this.uptimeInterval) {
      clearInterval(this.uptimeInterval);
    }
  }

  private startUptimeCollector(): void {
    this.serviceUptime.set({ service: this.serviceName }, 0);

    this.uptimeInterval = setInterval(() => {
      const uptimeSeconds = (Date.now() - this.startedAt) / 1000;
      this.serviceUptime.set({ service: this.serviceName }, uptimeSeconds);
    }, 5000);
  }
}

let defaultRegistry: MetricsRegistry | undefined;

export function createMetricsRegistry(options?: MetricsRegistryOptions): MetricsRegistry {
  return new MetricsRegistry(options);
}

export function getMetricsRegistry(): MetricsRegistry {
  if (!defaultRegistry) {
    defaultRegistry = createMetricsRegistry();
  }

  return defaultRegistry;
}

export function setDefaultMetricsRegistry(registry: MetricsRegistry): void {
  defaultRegistry = registry;
}
