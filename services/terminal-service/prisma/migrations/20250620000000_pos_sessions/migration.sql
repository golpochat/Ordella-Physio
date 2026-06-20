-- Terminal pairing, POS sessions, and payments
CREATE TYPE "PosSessionStatus" AS ENUM ('OPEN', 'CLOSED', 'RECONCILED');
CREATE TYPE "PosPaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

ALTER TABLE "terminals" ADD COLUMN IF NOT EXISTS "deviceToken" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "terminals_deviceToken_key" ON "terminals"("deviceToken");

CREATE TABLE IF NOT EXISTS "terminal_pairing_codes" (
  "id" TEXT NOT NULL,
  "terminalId" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "terminal_pairing_codes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "terminal_pairing_codes_code_key" ON "terminal_pairing_codes"("code");
CREATE INDEX IF NOT EXISTS "terminal_pairing_codes_terminalId_idx" ON "terminal_pairing_codes"("terminalId");
ALTER TABLE "terminal_pairing_codes" ADD CONSTRAINT "terminal_pairing_codes_terminalId_fkey"
  FOREIGN KEY ("terminalId") REFERENCES "terminals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "pos_sessions" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "terminalId" TEXT NOT NULL,
  "operatorId" TEXT NOT NULL,
  "status" "PosSessionStatus" NOT NULL DEFAULT 'OPEN',
  "openingCash" INTEGER NOT NULL DEFAULT 0,
  "closingCash" INTEGER,
  "expectedTotal" INTEGER,
  "actualTotal" INTEGER,
  "variance" INTEGER,
  "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "closedAt" TIMESTAMP(3),
  "reconciledAt" TIMESTAMP(3),
  CONSTRAINT "pos_sessions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "pos_sessions_tenantId_terminalId_idx" ON "pos_sessions"("tenantId", "terminalId");
CREATE INDEX IF NOT EXISTS "pos_sessions_tenantId_status_idx" ON "pos_sessions"("tenantId", "status");
ALTER TABLE "pos_sessions" ADD CONSTRAINT "pos_sessions_terminalId_fkey"
  FOREIGN KEY ("terminalId") REFERENCES "terminals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "pos_session_items" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "unitPrice" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "pos_session_items_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "pos_session_items_sessionId_idx" ON "pos_session_items"("sessionId");
ALTER TABLE "pos_session_items" ADD CONSTRAINT "pos_session_items_sessionId_fkey"
  FOREIGN KEY ("sessionId") REFERENCES "pos_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "pos_payments" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'usd',
  "status" "PosPaymentStatus" NOT NULL DEFAULT 'PENDING',
  "stripeIntentId" TEXT,
  "paymentIntentId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "pos_payments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "pos_payments_sessionId_idx" ON "pos_payments"("sessionId");
ALTER TABLE "pos_payments" ADD CONSTRAINT "pos_payments_sessionId_fkey"
  FOREIGN KEY ("sessionId") REFERENCES "pos_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
