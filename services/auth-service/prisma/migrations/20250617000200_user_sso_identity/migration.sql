-- Auth-service SSO identity fields.

ALTER TABLE "users" ALTER COLUMN "passwordHash" DROP NOT NULL;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "ssoSubject" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "ssoProvider" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "users_tenantId_ssoProvider_ssoSubject_key"
  ON "users"("tenantId", "ssoProvider", "ssoSubject")
  WHERE "tenantId" IS NOT NULL AND "ssoProvider" IS NOT NULL AND "ssoSubject" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "users_organizationId_idx" ON "users"("organizationId");
