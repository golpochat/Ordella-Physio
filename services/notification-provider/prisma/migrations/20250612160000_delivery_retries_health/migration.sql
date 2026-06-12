-- AlterEnum
ALTER TYPE "NotificationProviderName" ADD VALUE IF NOT EXISTS 'VIBER';

-- AlterTable
ALTER TABLE "provider_configs" ADD COLUMN "lastHealthCheckAt" TIMESTAMP(3);
ALTER TABLE "provider_configs" ADD COLUMN "isHealthy" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "delivery_logs" ADD COLUMN "retryCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "delivery_logs" ADD COLUMN "nextAttemptAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "delivery_logs_nextAttemptAt_idx" ON "delivery_logs"("nextAttemptAt");
CREATE INDEX "delivery_logs_tenantId_createdAt_idx" ON "delivery_logs"("tenantId", "createdAt");
