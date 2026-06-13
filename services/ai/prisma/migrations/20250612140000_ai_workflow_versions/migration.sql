-- CreateTable
CREATE TABLE "ai_workflow_versions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "label" TEXT,
    "definition" JSONB NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_workflow_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_workflow_versions_workflowId_versionNumber_key" ON "ai_workflow_versions"("workflowId", "versionNumber");
CREATE INDEX "ai_workflow_versions_workflowId_idx" ON "ai_workflow_versions"("workflowId");
CREATE INDEX "ai_workflow_versions_tenantId_workflowId_idx" ON "ai_workflow_versions"("tenantId", "workflowId");
