ALTER TABLE "tenant_billing_accounts"
ADD COLUMN "stripeAiNotesSubscriptionItemId" TEXT;

CREATE TABLE "ai_notes_usage_records" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "organizationId" TEXT,
    "billingEntity" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripeSubscriptionItemId" TEXT NOT NULL,
    "stripeUsageRecordId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_notes_usage_records_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ai_notes_usage_records_stripeUsageRecordId_key" ON "ai_notes_usage_records"("stripeUsageRecordId");
CREATE INDEX "ai_notes_usage_records_tenantId_idx" ON "ai_notes_usage_records"("tenantId");
CREATE INDEX "ai_notes_usage_records_organizationId_idx" ON "ai_notes_usage_records"("organizationId");
CREATE INDEX "ai_notes_usage_records_stripeCustomerId_idx" ON "ai_notes_usage_records"("stripeCustomerId");

CREATE TABLE "ai_notes_invoice_items" (
    "id" TEXT NOT NULL,
    "stripeInvoiceId" TEXT NOT NULL,
    "stripeLineItemId" TEXT,
    "stripeCustomerId" TEXT NOT NULL,
    "tenantId" TEXT,
    "organizationId" TEXT,
    "billingEntity" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "invoiceStatus" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_notes_invoice_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ai_notes_invoice_items_stripeInvoiceId_stripeLineItemId_key" ON "ai_notes_invoice_items"("stripeInvoiceId", "stripeLineItemId");
CREATE INDEX "ai_notes_invoice_items_stripeCustomerId_idx" ON "ai_notes_invoice_items"("stripeCustomerId");
CREATE INDEX "ai_notes_invoice_items_tenantId_idx" ON "ai_notes_invoice_items"("tenantId");
CREATE INDEX "ai_notes_invoice_items_organizationId_idx" ON "ai_notes_invoice_items"("organizationId");
