-- CreateTable
CREATE TABLE "staff_configs" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "staff_configs_staffId_idx" ON "staff_configs"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_configs_staffId_namespace_key" ON "staff_configs"("staffId", "namespace");

-- AddForeignKey
ALTER TABLE "staff_configs" ADD CONSTRAINT "staff_configs_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
