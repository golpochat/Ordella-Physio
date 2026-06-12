-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'VIBER');
CREATE TYPE "NotificationProviderName" AS ENUM ('SENDGRID', 'TWILIO', 'FIREBASE', 'NONE');
CREATE TYPE "DeliveryStatus" AS ENUM ('SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "provider_configs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "provider" "NotificationProviderName" NOT NULL,
    "credentials" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "provider" "NotificationProviderName" NOT NULL,
    "status" "DeliveryStatus" NOT NULL,
    "errorMessage" TEXT,
    "requestPayload" JSONB NOT NULL,
    "responsePayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "provider_configs_tenantId_idx" ON "provider_configs"("tenantId");
CREATE INDEX "provider_configs_tenantId_channel_idx" ON "provider_configs"("tenantId", "channel");
CREATE INDEX "delivery_logs_tenantId_idx" ON "delivery_logs"("tenantId");
CREATE INDEX "delivery_logs_channel_idx" ON "delivery_logs"("channel");
CREATE INDEX "delivery_logs_provider_idx" ON "delivery_logs"("provider");
CREATE INDEX "delivery_logs_status_idx" ON "delivery_logs"("status");
