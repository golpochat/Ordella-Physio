-- CreateTable
CREATE TABLE "patient_attachments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "uploadedByStaffId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "storagePath" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "patient_attachments_tenantId_idx" ON "patient_attachments"("tenantId");

-- CreateIndex
CREATE INDEX "patient_attachments_patientId_idx" ON "patient_attachments"("patientId");

-- AddForeignKey
ALTER TABLE "patient_attachments" ADD CONSTRAINT "patient_attachments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
