-- Drop legacy audit_events table
DROP TABLE IF EXISTS "audit_events";

-- Alter daily_metrics
ALTER TABLE "daily_metrics" ADD COLUMN IF NOT EXISTS "outstandingBalance" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- Alter monthly_metrics
ALTER TABLE "monthly_metrics" ADD COLUMN IF NOT EXISTS "outstandingBalance" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- Create weekly_metrics
CREATE TABLE IF NOT EXISTS "weekly_metrics" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "totalAppointments" INTEGER NOT NULL DEFAULT 0,
    "completedAppointments" INTEGER NOT NULL DEFAULT 0,
    "cancelledAppointments" INTEGER NOT NULL DEFAULT 0,
    "noShowAppointments" INTEGER NOT NULL DEFAULT 0,
    "newPatients" INTEGER NOT NULL DEFAULT 0,
    "revenue" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "outstandingBalance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weekly_metrics_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "weekly_metrics_tenantId_week_key" ON "weekly_metrics"("tenantId", "week");
CREATE INDEX IF NOT EXISTS "weekly_metrics_tenantId_idx" ON "weekly_metrics"("tenantId");

-- Create ingested_events
CREATE TABLE IF NOT EXISTS "ingested_events" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "sourceService" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingested_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ingested_events_tenantId_idx" ON "ingested_events"("tenantId");
CREATE INDEX IF NOT EXISTS "ingested_events_tenantId_eventType_idx" ON "ingested_events"("tenantId", "eventType");
CREATE INDEX IF NOT EXISTS "ingested_events_tenantId_entityType_entityId_idx" ON "ingested_events"("tenantId", "entityType", "entityId");
CREATE INDEX IF NOT EXISTS "ingested_events_tenantId_ingestedAt_idx" ON "ingested_events"("tenantId", "ingestedAt");

-- Create dashboard_snapshots
CREATE TABLE IF NOT EXISTS "dashboard_snapshots" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "dashboardType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "dashboard_snapshots_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "dashboard_snapshots_tenantId_dashboardType_key" ON "dashboard_snapshots"("tenantId", "dashboardType");
CREATE INDEX IF NOT EXISTS "dashboard_snapshots_tenantId_idx" ON "dashboard_snapshots"("tenantId");
