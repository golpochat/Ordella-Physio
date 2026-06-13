-- CreateEnum
CREATE TYPE "AIDeploymentStatus" AS ENUM ('DEPLOYING', 'ACTIVE', 'FAILED', 'ROLLED_BACK');

-- CreateEnum
CREATE TYPE "AIRegionHealth" AS ENUM ('HEALTHY', 'DEGRADED', 'UNHEALTHY');

-- CreateTable
CREATE TABLE "ai_model_deployments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "regions" JSONB NOT NULL DEFAULT '[]',
    "rollout" JSONB NOT NULL DEFAULT '{}',
    "health" JSONB NOT NULL DEFAULT '{}',
    "status" "AIDeploymentStatus" NOT NULL DEFAULT 'DEPLOYING',
    "artifactLocation" TEXT NOT NULL DEFAULT '',
    "previousDeploymentId" TEXT,
    "pipeline" JSONB NOT NULL DEFAULT '{}',
    "failoverRegion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_model_deployments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_deployment_metrics" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "errorRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tokenThroughput" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "memoryUsageMb" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cpuLoad" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rolloutPercent" INTEGER NOT NULL DEFAULT 0,
    "canaryStable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ai_deployment_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_model_deployments_tenantId_modelId_version_key" ON "ai_model_deployments"("tenantId", "modelId", "version");

-- CreateIndex
CREATE INDEX "ai_model_deployments_tenantId_idx" ON "ai_model_deployments"("tenantId");

-- CreateIndex
CREATE INDEX "ai_model_deployments_modelId_idx" ON "ai_model_deployments"("modelId");

-- CreateIndex
CREATE INDEX "ai_model_deployments_tenantId_modelId_idx" ON "ai_model_deployments"("tenantId", "modelId");

-- CreateIndex
CREATE INDEX "ai_model_deployments_status_idx" ON "ai_model_deployments"("status");

-- CreateIndex
CREATE INDEX "ai_deployment_metrics_tenantId_modelId_version_idx" ON "ai_deployment_metrics"("tenantId", "modelId", "version");

-- CreateIndex
CREATE INDEX "ai_deployment_metrics_modelId_region_timestamp_idx" ON "ai_deployment_metrics"("modelId", "region", "timestamp");

-- AddForeignKey removed — metrics are keyed by tenant/model/version without strict FK
