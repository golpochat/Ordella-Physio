-- CreateEnum
CREATE TYPE "StorageProvider" AS ENUM ('LOCAL', 'S3', 'GCS', 'AZURE');

-- CreateTable
CREATE TABLE "file_objects" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "storageProvider" "StorageProvider" NOT NULL,
    "storageKey" TEXT NOT NULL,
    "checksum" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_objects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "file_objects_tenantId_idx" ON "file_objects"("tenantId");

-- CreateIndex
CREATE INDEX "file_objects_entityType_entityId_idx" ON "file_objects"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "file_objects_storageKey_idx" ON "file_objects"("storageKey");

-- CreateIndex
CREATE INDEX "file_objects_ownerUserId_idx" ON "file_objects"("ownerUserId");
