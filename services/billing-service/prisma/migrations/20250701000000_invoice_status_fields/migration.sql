-- AlterTable
ALTER TABLE "invoices" ADD COLUMN "paidAt" TIMESTAMP(3);
ALTER TABLE "invoices" ADD COLUMN "paymentReference" TEXT;
