-- CreateEnum
CREATE TYPE "PlatformIntegrationCategory" AS ENUM ('ADDRESS_LOOKUP');

-- CreateTable
CREATE TABLE "platform_integrations" (
    "id" TEXT NOT NULL,
    "category" "PlatformIntegrationCategory" NOT NULL DEFAULT 'ADDRESS_LOOKUP',
    "vendor" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "credentialsEncrypted" TEXT NOT NULL,
    "apiKeyLast4" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUserId" TEXT,

    CONSTRAINT "platform_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_runtime_state" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "activeAddressLookupIntegrationId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUserId" TEXT,

    CONSTRAINT "platform_runtime_state_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "platform_integrations_category_idx" ON "platform_integrations"("category");

-- AddForeignKey
ALTER TABLE "platform_runtime_state" ADD CONSTRAINT "platform_runtime_state_activeAddressLookupIntegrationId_fkey" FOREIGN KEY ("activeAddressLookupIntegrationId") REFERENCES "platform_integrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed singleton runtime row
INSERT INTO "platform_runtime_state" ("id", "updatedAt") VALUES ('default', CURRENT_TIMESTAMP);
