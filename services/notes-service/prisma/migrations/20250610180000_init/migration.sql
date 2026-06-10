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
    "noteId" TEXT NOT NULL,
    "subjective" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "assessment" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soap_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notes_tenantId_idx" ON "notes"("tenantId");

-- CreateIndex
CREATE INDEX "notes_tenantId_patientId_idx" ON "notes"("tenantId", "patientId");

-- CreateIndex
CREATE INDEX "notes_tenantId_therapistId_idx" ON "notes"("tenantId", "therapistId");

-- CreateIndex
CREATE INDEX "notes_tenantId_appointmentId_idx" ON "notes"("tenantId", "appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "soap_notes_noteId_key" ON "soap_notes"("noteId");

-- AddForeignKey
ALTER TABLE "soap_notes" ADD CONSTRAINT "soap_notes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
