INSERT INTO users (
  id,
  "tenantId",
  "organizationId",
  email,
  "passwordHash",
  role,
  "firstName",
  "lastName",
  "emailVerified",
  "isActive",
  "createdAt",
  "updatedAt",
  "permissionOverrides",
  "tokenVersion",
  "mfaEnabled"
)
VALUES (
  'dev_user_orgadmin',
  'demo-tenant',
  'demo-org',
  'orgadmin@ordella.dev',
  '$2b$12$XLc5w3HEUdKSUIxe38SnceHsqAs14qtLReRbSZV5m4Y..7GUzpAi2',
  'ORG_ADMIN',
  'Org',
  'Admin',
  true,
  true,
  NOW(),
  NOW(),
  '{}',
  0,
  false
)
ON CONFLICT ("tenantId", email) DO UPDATE SET
  "organizationId" = EXCLUDED."organizationId",
  "passwordHash" = EXCLUDED."passwordHash",
  role = EXCLUDED.role,
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  "emailVerified" = true,
  "isActive" = true,
  "updatedAt" = NOW();
