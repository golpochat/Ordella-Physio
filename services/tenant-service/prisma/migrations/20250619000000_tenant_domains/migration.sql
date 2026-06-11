-- CreateEnum
CREATE TYPE "DomainType" AS ENUM ('PRIMARY', 'CUSTOM');

-- CreateTable
CREATE TABLE "tenant_domains" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "type" "DomainType" NOT NULL,
    "verificationToken" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_domains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_domains_domain_key" ON "tenant_domains"("domain");

-- CreateIndex
CREATE INDEX "tenant_domains_tenantId_idx" ON "tenant_domains"("tenantId");

-- AddForeignKey
ALTER TABLE "tenant_domains" ADD CONSTRAINT "tenant_domains_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill primary domains for existing tenants
INSERT INTO "tenant_domains" ("id", "tenantId", "domain", "type", "verificationToken", "verified", "createdAt", "updatedAt")
SELECT
    md5(random()::text || t.id || clock_timestamp()::text),
    t.id,
    t.code || '.ordella.app',
    'PRIMARY'::"DomainType",
    '',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "tenants" t
WHERE NOT EXISTS (
    SELECT 1 FROM "tenant_domains" d WHERE d."tenantId" = t.id AND d.type = 'PRIMARY'::"DomainType"
);
