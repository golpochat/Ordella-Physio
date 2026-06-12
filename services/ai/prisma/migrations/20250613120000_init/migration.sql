-- CreateEnum
CREATE TYPE "AIProviderType" AS ENUM ('OPENAI', 'AZURE_OPENAI', 'ANTHROPIC', 'LOCAL');

-- CreateTable
CREATE TABLE "ai_provider_configs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "provider" "AIProviderType" NOT NULL,
    "modelName" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "baseUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_request_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "tokensInput" INTEGER NOT NULL DEFAULT 0,
    "tokensOutput" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_request_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_provider_configs_tenantId_idx" ON "ai_provider_configs"("tenantId");
CREATE INDEX "ai_provider_configs_provider_idx" ON "ai_provider_configs"("provider");
CREATE INDEX "ai_provider_configs_tenantId_isActive_priority_idx" ON "ai_provider_configs"("tenantId", "isActive", "priority");

-- CreateIndex
CREATE INDEX "ai_request_logs_tenantId_idx" ON "ai_request_logs"("tenantId");
CREATE INDEX "ai_request_logs_provider_idx" ON "ai_request_logs"("provider");
CREATE INDEX "ai_request_logs_createdAt_idx" ON "ai_request_logs"("createdAt");
