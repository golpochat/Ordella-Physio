-- CreateEnum
CREATE TYPE "AIDriftType" AS ENUM ('DATA', 'CONCEPT', 'EMBEDDING', 'PERFORMANCE');

-- CreateEnum
CREATE TYPE "AIDriftSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "ai_drift_events" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "driftType" "AIDriftType" NOT NULL,
    "severity" "AIDriftSeverity" NOT NULL,
    "metrics" JSONB NOT NULL DEFAULT '{}',
    "summary" TEXT NOT NULL DEFAULT '',
    "recommendedActions" JSONB NOT NULL DEFAULT '[]',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "mitigationAction" TEXT,

    CONSTRAINT "ai_drift_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_drift_metrics" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "granularity" TEXT NOT NULL DEFAULT 'HOURLY',
    "inputStats" JSONB NOT NULL DEFAULT '{}',
    "outputStats" JSONB NOT NULL DEFAULT '{}',
    "embeddingStats" JSONB NOT NULL DEFAULT '{}',
    "performanceStats" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "ai_drift_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_drift_events_tenantId_idx" ON "ai_drift_events"("tenantId");

-- CreateIndex
CREATE INDEX "ai_drift_events_modelId_idx" ON "ai_drift_events"("modelId");

-- CreateIndex
CREATE INDEX "ai_drift_events_modelId_detectedAt_idx" ON "ai_drift_events"("modelId", "detectedAt");

-- CreateIndex
CREATE INDEX "ai_drift_events_tenantId_severity_idx" ON "ai_drift_events"("tenantId", "severity");

-- CreateIndex
CREATE INDEX "ai_drift_metrics_tenantId_idx" ON "ai_drift_metrics"("tenantId");

-- CreateIndex
CREATE INDEX "ai_drift_metrics_modelId_idx" ON "ai_drift_metrics"("modelId");

-- CreateIndex
CREATE INDEX "ai_drift_metrics_modelId_timestamp_idx" ON "ai_drift_metrics"("modelId", "timestamp");
