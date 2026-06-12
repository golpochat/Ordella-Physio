-- CreateTable
CREATE TABLE "ai_memories" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "memoryKey" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_memories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_workflow_runs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "result" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_workflow_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_stream_sessions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "context" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "chunks" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_stream_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_memories_tenantId_memoryKey_key" ON "ai_memories"("tenantId", "memoryKey");
CREATE INDEX "ai_memories_tenantId_entityType_entityId_idx" ON "ai_memories"("tenantId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "ai_workflow_runs_tenantId_trigger_idx" ON "ai_workflow_runs"("tenantId", "trigger");
CREATE INDEX "ai_workflow_runs_createdAt_idx" ON "ai_workflow_runs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ai_stream_sessions_sessionId_key" ON "ai_stream_sessions"("sessionId");
CREATE INDEX "ai_stream_sessions_tenantId_idx" ON "ai_stream_sessions"("tenantId");
