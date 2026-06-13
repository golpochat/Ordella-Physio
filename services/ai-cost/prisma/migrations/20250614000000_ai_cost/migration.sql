-- CreateTable
CREATE TABLE "ai_cost_profiles" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "pricing" JSONB NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_cost_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_cost_usage_aggregates" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "totalTokensPrompt" INTEGER NOT NULL DEFAULT 0,
    "totalTokensCompletion" INTEGER NOT NULL DEFAULT 0,
    "totalCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "breakdownByModel" JSONB NOT NULL DEFAULT '{}',
    "breakdownByFeature" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_cost_usage_aggregates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_cost_alerts" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ai_cost_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_cost_budgets" (
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

    CONSTRAINT "ai_cost_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_cost_usage_events" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT,
    "feature" TEXT,
    "tokensPrompt" INTEGER NOT NULL DEFAULT 0,
    "tokensCompletion" INTEGER NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "ai_cost_usage_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_cost_profiles_modelId_idx" ON "ai_cost_profiles"("modelId");

-- CreateIndex
CREATE INDEX "ai_cost_profiles_modelId_effectiveFrom_idx" ON "ai_cost_profiles"("modelId", "effectiveFrom");

-- CreateIndex
CREATE INDEX "ai_cost_usage_aggregates_tenantId_period_idx" ON "ai_cost_usage_aggregates"("tenantId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "ai_cost_usage_aggregates_tenantId_period_periodStart_key" ON "ai_cost_usage_aggregates"("tenantId", "period", "periodStart");

-- CreateIndex
CREATE INDEX "ai_cost_alerts_tenantId_createdAt_idx" ON "ai_cost_alerts"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "ai_cost_alerts_tenantId_resolvedAt_idx" ON "ai_cost_alerts"("tenantId", "resolvedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ai_cost_budgets_tenantId_key" ON "ai_cost_budgets"("tenantId");

-- CreateIndex
CREATE INDEX "ai_cost_usage_events_tenantId_timestamp_idx" ON "ai_cost_usage_events"("tenantId", "timestamp");

-- CreateIndex
CREATE INDEX "ai_cost_usage_events_tenantId_modelId_idx" ON "ai_cost_usage_events"("tenantId", "modelId");

-- CreateIndex
CREATE INDEX "ai_cost_usage_events_tenantId_feature_idx" ON "ai_cost_usage_events"("tenantId", "feature");
