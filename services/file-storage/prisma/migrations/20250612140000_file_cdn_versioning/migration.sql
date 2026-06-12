-- CreateEnum
CREATE TYPE "FileVariant" AS ENUM ('ORIGINAL', 'THUMB_SMALL', 'THUMB_MEDIUM');

-- AlterTable
ALTER TABLE "file_objects" ADD COLUMN "parentFileId" TEXT;
ALTER TABLE "file_objects" ADD COLUMN "variant" "FileVariant" NOT NULL DEFAULT 'ORIGINAL';
ALTER TABLE "file_objects" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "file_objects" ADD COLUMN "previousVersionFileId" TEXT;

-- CreateIndex
CREATE INDEX "file_objects_parentFileId_idx" ON "file_objects"("parentFileId");
CREATE INDEX "file_objects_previousVersionFileId_idx" ON "file_objects"("previousVersionFileId");
CREATE INDEX "file_objects_variant_idx" ON "file_objects"("variant");

-- AddForeignKey
ALTER TABLE "file_objects" ADD CONSTRAINT "file_objects_parentFileId_fkey" FOREIGN KEY ("parentFileId") REFERENCES "file_objects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "file_objects" ADD CONSTRAINT "file_objects_previousVersionFileId_fkey" FOREIGN KEY ("previousVersionFileId") REFERENCES "file_objects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
