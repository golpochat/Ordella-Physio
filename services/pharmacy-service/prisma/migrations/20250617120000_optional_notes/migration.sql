-- AlterTable
ALTER TABLE "prescriptions" ALTER COLUMN "notes" DROP NOT NULL;
ALTER TABLE "prescriptions" ALTER COLUMN "notes" DROP DEFAULT;

-- AlterTable
ALTER TABLE "pharmacy_fulfillments" ALTER COLUMN "notes" DROP NOT NULL;
ALTER TABLE "pharmacy_fulfillments" ALTER COLUMN "notes" DROP DEFAULT;
