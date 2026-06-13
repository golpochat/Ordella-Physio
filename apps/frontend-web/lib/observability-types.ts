export type TraceService = "gateway" | "inference" | "training" | "deployment" | "dataset";
export type TraceStatus = "OK" | "ERROR";
export type LogLevel = "INFO" | "WARN" | "ERROR";
export type MetricType = "latency" | "error_rate" | "throughput" | "token_usage";

export type TraceSpanRecord = {
  id: string;
  traceId: string;
  spanId: string;
  parentSpanId: string | null;
  tenantId: string;
  service: TraceService;
  operation: string;
  startTime: string;
  endTime: string | null;
  durationMs: number | null;
  metadata: Record<string, unknown>;
  status: TraceStatus;
};

export type TraceDetail = {
  traceId: string;
  status: TraceStatus;
  durationMs: number;
  service: TraceService;
  spans: TraceSpanRecord[];
  waterfall: Array<{
    spanId: string;
    operation: string;
    service: TraceService;
    startOffsetMs: number;
    durationMs: number;
    status: TraceStatus;
  }>;
};

export type LogEventRecord = {
  id: string;
  tenantId: string;
  service: TraceService;
  level: LogLevel;
  message: string;
  metadata: Record<string, unknown>;
  timestamp: string;
};

export type MetricAggregate = {
  metricType: MetricType;
  count: number;
  avg: number;
  min: number;
  max: number;
  p50: number;
  p95: number;
  p99: number;
};

export type HeatmapCell = {
  region: string;
  value: number;
  sampleCount: number;
};

export type HeatmapData = {
  type: MetricType;
  regions: string[];
  cells: Array<{ modelId: string; regions: HeatmapCell[] }>;
  generatedAt: string;
};

export type BottleneckAlert = {
  id: string;
  tenantId: string;
  alertType: string;
  entity: string;
  severity: string;
  message: string;
  metadata: Record<string, unknown>;
  detectedAt: string;
  resolvedAt: string | null;
};

export type ObservabilityDashboard = {
  generatedAt: string;
  summary: {
    traceCount: number;
    logCount: number;
    openAlerts: number;
    latencyP95: number;
  };
  heatmaps: {
    latency: HeatmapData;
    errorRate: HeatmapData;
  };
  bottlenecks: BottleneckAlert[];
  modelPerformance: Array<{ modelId: string; metrics: Array<{ metricType: MetricType; count: number; avg: number }> }>;
  regionPerformance: Array<{ region: string; metrics: Array<{ metricType: MetricType; count: number; avg: number }> }>;
  recentTraces: TraceSpanRecord[];
  recentLogs: LogEventRecord[];
  overlays: Record<string, { status: string; endpoint: string }>;
};

export type PipelineView = {
  stages: Array<{ stage: string; label: string; events: number; status: string }>;
  endToEndTraces: TraceSpanRecord[];
  flow: Array<{ stage: string; label: string; events: number; status: string; next: string | null }>;
};
