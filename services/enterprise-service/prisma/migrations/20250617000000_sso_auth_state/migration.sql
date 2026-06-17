CREATE TABLE IF NOT EXISTS "sso_auth_states" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "redirectUri" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sso_auth_states_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "sso_auth_states_state_key" ON "sso_auth_states"("state");
CREATE INDEX IF NOT EXISTS "sso_auth_states_expiresAt_idx" ON "sso_auth_states"("expiresAt");
CREATE INDEX IF NOT EXISTS "sso_auth_states_tenantId_idx" ON "sso_auth_states"("tenantId");
