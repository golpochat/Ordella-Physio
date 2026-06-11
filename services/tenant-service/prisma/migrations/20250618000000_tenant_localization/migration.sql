-- CreateEnum
CREATE TYPE "NumberFormat" AS ENUM ('EU', 'US');

-- CreateTable
CREATE TABLE "tenant_localization" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "dateFormat" TEXT NOT NULL DEFAULT 'YYYY-MM-DD',
    "timeFormat" TEXT NOT NULL DEFAULT 'HH:mm',
    "numberFormat" "NumberFormat" NOT NULL DEFAULT 'US',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_localization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_localization_tenantId_key" ON "tenant_localization"("tenantId");

-- AddForeignKey
ALTER TABLE "tenant_localization" ADD CONSTRAINT "tenant_localization_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
