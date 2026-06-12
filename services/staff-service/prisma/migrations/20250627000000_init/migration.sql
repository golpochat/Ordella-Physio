-- CreateEnum
CREATE TYPE "StaffType" AS ENUM ('DOCTOR', 'NURSE', 'ADMIN', 'RECEPTIONIST', 'TECHNICIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "StaffStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "staff_members" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "staffType" "StaffType" NOT NULL,
    "roleId" TEXT NOT NULL,
    "status" "StaffStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_locations" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "staff_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "staff_members_tenantId_idx" ON "staff_members"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_members_tenantId_email_key" ON "staff_members"("tenantId", "email");

-- CreateIndex
CREATE INDEX "staff_locations_staffId_idx" ON "staff_locations"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_locations_staffId_locationId_key" ON "staff_locations"("staffId", "locationId");

-- AddForeignKey
ALTER TABLE "staff_locations" ADD CONSTRAINT "staff_locations_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
