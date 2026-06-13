-- CreateEnum
CREATE TYPE "AITrainingExperimentStatus" AS ENUM ('RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "ai_training_experiments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "trainingJobId" TEXT NOT NULL,
    "experimentName" TEXT NOT NULL,
    "hyperparameters" JSONB NOT NULL DEFAULT '{}',
    "metrics" JSONB NOT NULL DEFAULT '{}',
    "trainingCurve" JSONB NOT NULL DEFAULT '[]',
    "status" "AITrainingExperimentStatus" NOT NULL DEFAULT 'RUNNING',
    "label" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "createdByUserId" TEXT NOT NULL,

    CONSTRAINT "ai_training_experiments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ai_training_checkpoints" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "trainingJobId" TEXT NOT NULL,
    "experimentId" TEXT,
    "checkpointNumber" INTEGER NOT NULL,
    "fileLocation" TEXT NOT NULL,
    "metricsSnapshot" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_training_checkpoints_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ai_training_experiments_trainingJobId_idx" ON "ai_training_experiments"("trainingJobId");
CREATE INDEX "ai_training_experiments_tenantId_idx" ON "ai_training_experiments"("tenantId");
CREATE UNIQUE INDEX "ai_training_checkpoints_trainingJobId_checkpointNumber_key" ON "ai_training_checkpoints"("trainingJobId", "checkpointNumber");
CREATE INDEX "ai_training_checkpoints_trainingJobId_idx" ON "ai_training_checkpoints"("trainingJobId");

ALTER TABLE "ai_training_experiments" ADD CONSTRAINT "ai_training_experiments_trainingJobId_fkey" FOREIGN KEY ("trainingJobId") REFERENCES "ai_training_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ai_training_checkpoints" ADD CONSTRAINT "ai_training_checkpoints_trainingJobId_fkey" FOREIGN KEY ("trainingJobId") REFERENCES "ai_training_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ai_training_checkpoints" ADD CONSTRAINT "ai_training_checkpoints_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "ai_training_experiments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
