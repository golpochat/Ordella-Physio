-- CreateTable
CREATE TABLE "ai_audit_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "apiKeyId" TEXT,
    "action" TEXT NOT NULL,
    "modelId" TEXT,
    "requestMetadata" JSONB NOT NULL DEFAULT '{}',
    "responseMetadata" JSONB NOT NULL DEFAULT '{}',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "piiDetected" BOOLEAN NOT NULL DEFAULT false,
    "redacted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ai_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_access_policies" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "allowedRoles" JSONB NOT NULL DEFAULT '[]',
    "allowedUsers" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_access_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_pii_incidents" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT,
    "piiType" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "redactedText" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ai_pii_incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_secure_prompt_store" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT,
    "promptHash" TEXT NOT NULL,
    "responseHash" TEXT,
    "redactedPrompt" TEXT NOT NULL,
    "redactedResponse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_secure_prompt_store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_audit_logs_tenantId_timestamp_idx" ON "ai_audit_logs"("tenantId", "timestamp");

-- CreateIndex
CREATE INDEX "ai_audit_logs_tenantId_action_idx" ON "ai_audit_logs"("tenantId", "action");

-- CreateIndex
CREATE INDEX "ai_audit_logs_tenantId_modelId_idx" ON "ai_audit_logs"("tenantId", "modelId");

-- CreateIndex
CREATE INDEX "ai_access_policies_tenantId_idx" ON "ai_access_policies"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "ai_access_policies_tenantId_modelId_key" ON "ai_access_policies"("tenantId", "modelId");

-- CreateIndex
CREATE INDEX "ai_pii_incidents_tenantId_detectedAt_idx" ON "ai_pii_incidents"("tenantId", "detectedAt");

-- CreateIndex
CREATE INDEX "ai_pii_incidents_tenantId_resolvedAt_idx" ON "ai_pii_incidents"("tenantId", "resolvedAt");

-- CreateIndex
CREATE INDEX "ai_secure_prompt_store_tenantId_createdAt_idx" ON "ai_secure_prompt_store"("tenantId", "createdAt");
