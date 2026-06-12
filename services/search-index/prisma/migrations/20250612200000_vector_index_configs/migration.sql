-- CreateEnum
CREATE TYPE "VectorIndexProvider" AS ENUM ('LOCAL', 'PINECONE', 'ELASTICSEARCH_VECTOR', 'QDRANT');

-- CreateEnum
CREATE TYPE "EmbeddingModel" AS ENUM ('OPENAI_TEXT_EMBEDDING', 'LOCAL_MINILM');

-- CreateTable
CREATE TABLE "vector_index_configs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "indexName" TEXT NOT NULL,
    "provider" "VectorIndexProvider" NOT NULL DEFAULT 'LOCAL',
    "embeddingModel" "EmbeddingModel" NOT NULL DEFAULT 'LOCAL_MINILM',
    "dimensions" INTEGER NOT NULL DEFAULT 384,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vector_index_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vector_index_configs_tenantId_indexName_key" ON "vector_index_configs"("tenantId", "indexName");

-- CreateIndex
CREATE INDEX "vector_index_configs_tenantId_idx" ON "vector_index_configs"("tenantId");

-- CreateIndex
CREATE INDEX "vector_index_configs_indexName_idx" ON "vector_index_configs"("indexName");
