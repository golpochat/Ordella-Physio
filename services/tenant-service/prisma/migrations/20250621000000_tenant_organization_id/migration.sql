ALTER TABLE "tenants" ADD COLUMN "organizationId" TEXT;

CREATE INDEX "tenants_organizationId_idx" ON "tenants"("organizationId");
