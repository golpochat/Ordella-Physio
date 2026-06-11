-- CreateTable
CREATE TABLE "tenant_billing_settings" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "billingEmail" TEXT NOT NULL,
    "billingContactName" TEXT NOT NULL,
    "billingAddressLine1" TEXT NOT NULL,
    "billingAddressLine2" TEXT,
    "billingCity" TEXT NOT NULL,
    "billingPostcode" TEXT NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "taxNumber" TEXT,
    "invoicePrefix" TEXT,
    "defaultCurrency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_billing_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_billing_settings_tenantId_key" ON "tenant_billing_settings"("tenantId");

-- AddForeignKey
ALTER TABLE "tenant_billing_settings" ADD CONSTRAINT "tenant_billing_settings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
