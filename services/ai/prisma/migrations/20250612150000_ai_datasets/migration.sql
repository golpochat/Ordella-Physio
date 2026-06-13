-- CreateEnum
CREATE TYPE "AIDatasetType" AS ENUM ('TEXT', 'JSON', 'CONVERSATION', 'EMBEDDING');
CREATE TYPE "AIDatasetLabelType" AS ENUM ('CLASSIFICATION', 'EXTRACTION', 'CORRECTION');

-- CreateTable
CREATE TABLE "ai_datasets" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "type" "AIDatasetType" NOT NULL DEFAULT 'TEXT',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_datasets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_dataset_versions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "recordCount" INTEGER NOT NULL DEFAULT 0,
    "embeddingModel" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_dataset_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_dataset_records" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "embedding" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_dataset_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_dataset_labels" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "labelType" "AIDatasetLabelType" NOT NULL,
    "labelValue" JSONB NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_dataset_labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_dataset_audit_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_dataset_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_datasets_tenantId_idx" ON "ai_datasets"("tenantId");
CREATE INDEX "ai_datasets_tenantId_type_idx" ON "ai_datasets"("tenantId", "type");

CREATE UNIQUE INDEX "ai_dataset_versions_datasetId_versionNumber_key" ON "ai_dataset_versions"("datasetId", "versionNumber");
CREATE INDEX "ai_dataset_versions_datasetId_idx" ON "ai_dataset_versions"("datasetId");
CREATE INDEX "ai_dataset_versions_tenantId_datasetId_idx" ON "ai_dataset_versions"("tenantId", "datasetId");

CREATE INDEX "ai_dataset_records_datasetId_versionId_idx" ON "ai_dataset_records"("datasetId", "versionId");
CREATE INDEX "ai_dataset_records_tenantId_idx" ON "ai_dataset_records"("tenantId");

CREATE INDEX "ai_dataset_labels_recordId_idx" ON "ai_dataset_labels"("recordId");
CREATE INDEX "ai_dataset_labels_tenantId_idx" ON "ai_dataset_labels"("tenantId");

CREATE INDEX "ai_dataset_audit_logs_datasetId_idx" ON "ai_dataset_audit_logs"("datasetId");
CREATE INDEX "ai_dataset_audit_logs_tenantId_datasetId_idx" ON "ai_dataset_audit_logs"("tenantId", "datasetId");
CREATE INDEX "ai_dataset_audit_logs_createdAt_idx" ON "ai_dataset_audit_logs"("createdAt");

-- AddForeignKey
ALTER TABLE "ai_dataset_versions" ADD CONSTRAINT "ai_dataset_versions_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "ai_datasets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ai_dataset_records" ADD CONSTRAINT "ai_dataset_records_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "ai_datasets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ai_dataset_records" ADD CONSTRAINT "ai_dataset_records_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "ai_dataset_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ai_dataset_labels" ADD CONSTRAINT "ai_dataset_labels_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "ai_dataset_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ai_dataset_audit_logs" ADD CONSTRAINT "ai_dataset_audit_logs_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "ai_datasets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
