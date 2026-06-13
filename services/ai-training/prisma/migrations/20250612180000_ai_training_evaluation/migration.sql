-- CreateEnum
CREATE TYPE "AIModelPromotionStage" AS ENUM ('STAGING', 'PRODUCTION', 'DEPRECATED');

-- CreateTable
CREATE TABLE "ai_model_evaluations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "metrics" JSONB NOT NULL DEFAULT '{}',
    "evaluationReport" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_model_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_model_promotions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "stage" "AIModelPromotionStage" NOT NULL DEFAULT 'STAGING',
    "rolloutPercentage" INTEGER NOT NULL DEFAULT 0,
    "canaryHistory" JSONB NOT NULL DEFAULT '[]',
    "promotedByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_model_promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_model_evaluations_tenantId_idx" ON "ai_model_evaluations"("tenantId");

-- CreateIndex
CREATE INDEX "ai_model_evaluations_modelId_idx" ON "ai_model_evaluations"("modelId");

-- CreateIndex
CREATE INDEX "ai_model_evaluations_modelId_createdAt_idx" ON "ai_model_evaluations"("modelId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ai_model_promotions_modelId_key" ON "ai_model_promotions"("modelId");

-- CreateIndex
CREATE INDEX "ai_model_promotions_tenantId_idx" ON "ai_model_promotions"("tenantId");

-- CreateIndex
CREATE INDEX "ai_model_promotions_tenantId_stage_idx" ON "ai_model_promotions"("tenantId", "stage");

-- AddForeignKey
ALTER TABLE "ai_model_evaluations" ADD CONSTRAINT "ai_model_evaluations_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ai_model_registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_model_promotions" ADD CONSTRAINT "ai_model_promotions_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ai_model_registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
