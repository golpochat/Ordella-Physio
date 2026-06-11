-- CreateEnum
CREATE TYPE "TerminalType" AS ENUM ('POS', 'KIOSK', 'PRINTER', 'TABLET', 'OTHER');

-- CreateEnum
CREATE TYPE "TerminalStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "terminals" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "TerminalType" NOT NULL,
    "ipAddress" TEXT,
    "macAddress" TEXT,
    "status" "TerminalStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "terminals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "terminals_tenantId_idx" ON "terminals"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "terminals_locationId_code_key" ON "terminals"("locationId", "code");
