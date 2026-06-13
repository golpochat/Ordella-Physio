-- CreateTable
CREATE TABLE "ai_trace_spans" (
    "id" TEXT NOT NULL,
    "traceId" TEXT NOT NULL,
    "spanId" TEXT NOT NULL,
    "parentSpanId" TEXT,
    "tenantId" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "durationMs" INTEGER,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'OK',
    CONSTRAINT "ai_trace_spans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_log_events" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ai_log_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_metric_points" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT,
    "region" TEXT,
    "metricType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ai_metric_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_bottleneck_alerts" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    CONSTRAINT "ai_bottleneck_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_trace_spans_tenantId_traceId_idx" ON "ai_trace_spans"("tenantId", "traceId");
CREATE INDEX "ai_trace_spans_tenantId_service_idx" ON "ai_trace_spans"("tenantId", "service");
CREATE INDEX "ai_trace_spans_tenantId_startTime_idx" ON "ai_trace_spans"("tenantId", "startTime");

-- CreateIndex
CREATE INDEX "ai_log_events_tenantId_timestamp_idx" ON "ai_log_events"("tenantId", "timestamp");
CREATE INDEX "ai_log_events_tenantId_service_idx" ON "ai_log_events"("tenantId", "service");
CREATE INDEX "ai_log_events_tenantId_level_idx" ON "ai_log_events"("tenantId", "level");

-- CreateIndex
CREATE INDEX "ai_metric_points_tenantId_metricType_timestamp_idx" ON "ai_metric_points"("tenantId", "metricType", "timestamp");
CREATE INDEX "ai_metric_points_tenantId_modelId_idx" ON "ai_metric_points"("tenantId", "modelId");
CREATE INDEX "ai_metric_points_tenantId_region_idx" ON "ai_metric_points"("tenantId", "region");

-- CreateIndex
CREATE INDEX "ai_bottleneck_alerts_tenantId_detectedAt_idx" ON "ai_bottleneck_alerts"("tenantId", "detectedAt");
