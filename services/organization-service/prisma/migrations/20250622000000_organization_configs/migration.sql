CREATE TABLE "organization_configs" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_configs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "organization_configs_organizationId_namespace_key" ON "organization_configs"("organizationId", "namespace");
CREATE INDEX "organization_configs_organizationId_idx" ON "organization_configs"("organizationId");

ALTER TABLE "organization_configs" ADD CONSTRAINT "organization_configs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
