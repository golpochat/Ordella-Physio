-- CreateTable
CREATE TABLE "ai_workflow_live_events" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workflowId" TEXT,
    "workflowName" TEXT,
    "runId" TEXT,
    "eventType" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "durationMs" INTEGER,
    "status" TEXT,

    CONSTRAINT "ai_workflow_live_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_workflow_live_events_tenantId_idx" ON "ai_workflow_live_events"("tenantId");
CREATE INDEX "ai_workflow_live_events_workflowId_idx" ON "ai_workflow_live_events"("workflowId");
CREATE INDEX "ai_workflow_live_events_timestamp_idx" ON "ai_workflow_live_events"("timestamp");
CREATE INDEX "ai_workflow_live_events_tenantId_timestamp_idx" ON "ai_workflow_live_events"("tenantId", "timestamp");
