-- AlterTable
ALTER TABLE "file_objects" ADD COLUMN "isDeleted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "file_objects" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "file_objects" ADD COLUMN "deletedByUserId" TEXT;
ALTER TABLE "file_objects" ADD COLUMN "expiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "file_objects_isDeleted_deletedAt_idx" ON "file_objects"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "file_objects_expiresAt_idx" ON "file_objects"("expiresAt");
