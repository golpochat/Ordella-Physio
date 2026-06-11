-- Location configuration store (namespaced JSON settings per location)

CREATE TABLE "location_configs" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_configs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "location_configs_locationId_namespace_key" ON "location_configs"("locationId", "namespace");
CREATE INDEX "location_configs_locationId_idx" ON "location_configs"("locationId");

ALTER TABLE "location_configs" ADD CONSTRAINT "location_configs_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
