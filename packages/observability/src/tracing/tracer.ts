import {
  context,
  trace,
  SpanStatusCode,
  type Span,
  type SpanOptions,
  type Tracer,
} from "@opentelemetry/api";
import {
  DEFAULT_DEPLOYMENT_ENVIRONMENT,
  DEFAULT_SERVICE_NAME,
  DEFAULT_SERVICE_VERSION,
} from "../constants";

export type TracerResourceAttributes = {
  serviceName?: string;
  serviceVersion?: string;
  deploymentEnvironment?: string;
};

export type TracerProviderConfig = TracerResourceAttributes & {
  tracerName?: string;
};

let configuredTracer: Tracer | undefined;
let resourceAttributes: TracerResourceAttributes = {
  serviceName: DEFAULT_SERVICE_NAME,
  serviceVersion: DEFAULT_SERVICE_VERSION,
  deploymentEnvironment: DEFAULT_DEPLOYMENT_ENVIRONMENT,
};

export function initTracerProvider(config: TracerProviderConfig = {}): Tracer {
  resourceAttributes = {
    serviceName: config.serviceName ?? DEFAULT_SERVICE_NAME,
    serviceVersion: config.serviceVersion ?? DEFAULT_SERVICE_VERSION,
    deploymentEnvironment:
      config.deploymentEnvironment ??
      process.env.NODE_ENV ??
      DEFAULT_DEPLOYMENT_ENVIRONMENT,
  };

  configuredTracer = trace.getTracer(
    config.tracerName ?? resourceAttributes.serviceName ?? DEFAULT_SERVICE_NAME,
    resourceAttributes.serviceVersion,
  );

  return configuredTracer;
}

export function getTracer(): Tracer {
  if (!configuredTracer) {
    return initTracerProvider();
  }

  return configuredTracer;
}

export function getResourceAttributes(): TracerResourceAttributes {
  return { ...resourceAttributes };
}

export type StartSpanOptions = SpanOptions & {
  attributes?: Record<string, string | number | boolean>;
};

export function startSpan(name: string, options: StartSpanOptions = {}): Span {
  const tracer = getTracer();
  const span = tracer.startSpan(name, options);

  if (options.attributes) {
    span.setAttributes(options.attributes);
  }

  span.setAttributes({
    "service.name": resourceAttributes.serviceName ?? DEFAULT_SERVICE_NAME,
    "service.version": resourceAttributes.serviceVersion ?? DEFAULT_SERVICE_VERSION,
    "deployment.environment":
      resourceAttributes.deploymentEnvironment ?? DEFAULT_DEPLOYMENT_ENVIRONMENT,
  });

  return span;
}

export function endSpan(span: Span): void {
  span.end();
}

export function recordException(span: Span, error: unknown): void {
  if (error instanceof Error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    return;
  }

  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: typeof error === "string" ? error : "Unknown error",
  });
}

export function runWithSpan<T>(span: Span, fn: () => T): T {
  return context.with(trace.setSpan(context.active(), span), fn);
}

export function getActiveSpan(): Span | undefined {
  return trace.getSpan(context.active());
}

export function getTraceId(): string | undefined {
  const span = getActiveSpan();
  return span?.spanContext().traceId;
}
