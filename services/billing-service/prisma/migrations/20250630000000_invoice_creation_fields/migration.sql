-- AlterTable
ALTER TABLE "invoices" ADD COLUMN "staffId" TEXT;
ALTER TABLE "invoices" ADD COLUMN "issuedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "invoice_items" ADD COLUMN "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 0;
ALTER TABLE "invoice_items" ADD COLUMN "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- DropIndex
DROP INDEX IF EXISTS "invoices_invoiceNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "invoices_tenantId_invoiceNumber_key" ON "invoices"("tenantId", "invoiceNumber");
