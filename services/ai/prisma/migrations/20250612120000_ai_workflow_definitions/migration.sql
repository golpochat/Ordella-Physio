-- CreateTable
CREATE TABLE "ai_workflows" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "dryRun" BOOLEAN NOT NULL DEFAULT false,
    "trigger" JSONB NOT NULL,
    "conditions" JSONB NOT NULL DEFAULT '[]',
    "actions" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_workflows_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "ai_workflow_runs" ADD COLUMN "workflowId" TEXT;

-- CreateIndex
CREATE INDEX "ai_workflows_tenantId_idx" ON "ai_workflows"("tenantId");
CREATE INDEX "ai_workflows_tenantId_isActive_idx" ON "ai_workflows"("tenantId", "isActive");
CREATE INDEX "ai_workflow_runs_tenantId_workflowId_idx" ON "ai_workflow_runs"("tenantId", "workflowId");
