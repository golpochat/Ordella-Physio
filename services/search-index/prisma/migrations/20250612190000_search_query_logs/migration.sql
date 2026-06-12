-- CreateTable
CREATE TABLE "search_query_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "indexName" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "filters" JSONB,
    "totalHits" INTEGER NOT NULL DEFAULT 0,
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_query_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "search_query_logs_tenantId_idx" ON "search_query_logs"("tenantId");

-- CreateIndex
CREATE INDEX "search_query_logs_indexName_idx" ON "search_query_logs"("indexName");

-- CreateIndex
CREATE INDEX "search_query_logs_createdAt_idx" ON "search_query_logs"("createdAt");
