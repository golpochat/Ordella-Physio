-- CreateEnum
CREATE TYPE "SearchProviderName" AS ENUM ('MEILISEARCH', 'ELASTICSEARCH', 'LOCAL');

-- CreateTable
CREATE TABLE "search_index_configs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "indexName" TEXT NOT NULL,
    "provider" "SearchProviderName" NOT NULL DEFAULT 'LOCAL',
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_index_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "search_index_configs_tenantId_idx" ON "search_index_configs"("tenantId");

-- CreateIndex
CREATE INDEX "search_index_configs_indexName_idx" ON "search_index_configs"("indexName");

-- CreateIndex
CREATE UNIQUE INDEX "search_index_configs_tenantId_indexName_key" ON "search_index_configs"("tenantId", "indexName");
