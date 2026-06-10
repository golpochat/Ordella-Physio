-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('SOAP', 'GENERAL', 'EXERCISE_PLAN', 'PROGRESS');

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "therapistId" TEXT NOT NULL,
    "type" "NoteType" NOT NULL,
    "content" TEXT NOT NULL,
    "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soap_notes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "subjective" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "assessment" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soap_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notes_tenantId_idx" ON "notes"("tenantId");
CREATE INDEX "notes_tenantId_patientId_idx" ON "notes"("tenantId", "patientId");
CREATE INDEX "notes_tenantId_therapistId_idx" ON "notes"("tenantId", "therapistId");
CREATE INDEX "notes_tenantId_appointmentId_idx" ON "notes"("tenantId", "appointmentId");
CREATE INDEX "notes_tenantId_type_createdAt_idx" ON "notes"("tenantId", "type", "createdAt");
CREATE UNIQUE INDEX "soap_notes_noteId_key" ON "soap_notes"("noteId");
CREATE INDEX "soap_notes_tenantId_idx" ON "soap_notes"("tenantId");
CREATE INDEX "attachments_tenantId_noteId_idx" ON "attachments"("tenantId", "noteId");

-- AddForeignKey
ALTER TABLE "soap_notes" ADD CONSTRAINT "soap_notes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
