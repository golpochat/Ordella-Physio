-- CreateTable
CREATE TABLE "report_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "filters" JSONB NOT NULL,
    "resultUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "report_requests_tenantId_idx" ON "report_requests"("tenantId");

-- CreateIndex
CREATE INDEX "report_requests_tenantId_userId_idx" ON "report_requests"("tenantId", "userId");

-- CreateIndex
CREATE INDEX "report_requests_tenantId_status_idx" ON "report_requests"("tenantId", "status");

-- CreateIndex
CREATE INDEX "report_requests_tenantId_createdAt_idx" ON "report_requests"("tenantId", "createdAt");
