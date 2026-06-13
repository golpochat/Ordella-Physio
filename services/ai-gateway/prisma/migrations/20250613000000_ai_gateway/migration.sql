-- CreateTable
CREATE TABLE "ai_gateway_keys" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL DEFAULT '',
    "scopes" JSONB NOT NULL DEFAULT '[]',
    "rateLimitProfileId" TEXT,
    "budgetProfileId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "isThrottled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ai_gateway_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_rate_limits" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "name" TEXT NOT NULL,
    "requestsPerMinute" INTEGER NOT NULL DEFAULT 60,
    "requestsPerHour" INTEGER NOT NULL DEFAULT 1000,
    "requestsPerDay" INTEGER NOT NULL DEFAULT 10000,
    "tokensPerMinute" INTEGER NOT NULL DEFAULT 100000,
    "tokensPerDay" INTEGER NOT NULL DEFAULT 1000000,
    "burstLimit" INTEGER NOT NULL DEFAULT 20,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_rate_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_budgets" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "monthlyTokenBudget" INTEGER NOT NULL DEFAULT 1000000,
    "monthlyCostBudget" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "softLimitPercentage" INTEGER NOT NULL DEFAULT 80,
    "hardLimitPercentage" INTEGER NOT NULL DEFAULT 100,
    "currentTokensUsed" INTEGER NOT NULL DEFAULT 0,
    "currentCostUsed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "periodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_usage_events" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "gatewayKeyId" TEXT,
    "modelId" TEXT,
    "tokensPrompt" INTEGER NOT NULL DEFAULT 0,
    "tokensCompletion" INTEGER NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "ai_usage_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_gateway_keys_keyHash_key" ON "ai_gateway_keys"("keyHash");

-- CreateIndex
CREATE INDEX "ai_gateway_keys_tenantId_idx" ON "ai_gateway_keys"("tenantId");

-- CreateIndex
CREATE INDEX "ai_gateway_keys_tenantId_isActive_idx" ON "ai_gateway_keys"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ai_budgets_tenantId_key" ON "ai_budgets"("tenantId");

-- CreateIndex
CREATE INDEX "ai_rate_limits_tenantId_idx" ON "ai_rate_limits"("tenantId");

-- CreateIndex
CREATE INDEX "ai_usage_events_tenantId_timestamp_idx" ON "ai_usage_events"("tenantId", "timestamp");

-- CreateIndex
CREATE INDEX "ai_usage_events_gatewayKeyId_idx" ON "ai_usage_events"("gatewayKeyId");

-- CreateIndex
CREATE INDEX "ai_usage_events_tenantId_modelId_idx" ON "ai_usage_events"("tenantId", "modelId");

-- AddForeignKey
ALTER TABLE "ai_usage_events" ADD CONSTRAINT "ai_usage_events_gatewayKeyId_fkey" FOREIGN KEY ("gatewayKeyId") REFERENCES "ai_gateway_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
