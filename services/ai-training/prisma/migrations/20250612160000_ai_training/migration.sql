-- CreateEnum
CREATE TYPE "AITrainingModelType" AS ENUM ('LLM', 'EMBEDDING');
CREATE TYPE "AITrainingProvider" AS ENUM ('OPENAI', 'AZURE', 'LOCAL');
CREATE TYPE "AITrainingJobStatus" AS ENUM ('QUEUED', 'RUNNING', 'FAILED', 'COMPLETED');
CREATE TYPE "AIModelRegistryStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'DEPRECATED');

-- CreateTable
CREATE TABLE "ai_training_jobs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "datasetVersionId" TEXT NOT NULL,
    "modelType" "AITrainingModelType" NOT NULL,
    "baseModel" TEXT NOT NULL,
    "trainingProvider" "AITrainingProvider" NOT NULL,
    "status" "AITrainingJobStatus" NOT NULL DEFAULT 'QUEUED',
    "hyperparameters" JSONB NOT NULL DEFAULT '{}',
    "trainingConfig" JSONB NOT NULL DEFAULT '{}',
    "logs" JSONB NOT NULL DEFAULT '[]',
    "metrics" JSONB NOT NULL DEFAULT '{}',
    "providerJobId" TEXT,
    "trainingFileLocation" TEXT,
    "outputModelId" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_training_jobs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ai_model_registry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "baseModel" TEXT NOT NULL,
    "trainingJobId" TEXT NOT NULL,
    "trainingProvider" "AITrainingProvider" NOT NULL,
    "fileLocation" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "status" "AIModelRegistryStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_model_registry_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ai_training_jobs_tenantId_idx" ON "ai_training_jobs"("tenantId");
CREATE INDEX "ai_training_jobs_tenantId_status_idx" ON "ai_training_jobs"("tenantId", "status");
CREATE INDEX "ai_training_jobs_datasetId_idx" ON "ai_training_jobs"("datasetId");
CREATE INDEX "ai_model_registry_tenantId_idx" ON "ai_model_registry"("tenantId");
CREATE INDEX "ai_model_registry_trainingJobId_idx" ON "ai_model_registry"("trainingJobId");
CREATE UNIQUE INDEX "ai_model_registry_tenantId_modelName_version_key" ON "ai_model_registry"("tenantId", "modelName", "version");

ALTER TABLE "ai_model_registry" ADD CONSTRAINT "ai_model_registry_trainingJobId_fkey" FOREIGN KEY ("trainingJobId") REFERENCES "ai_training_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
