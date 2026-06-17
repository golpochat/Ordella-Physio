-- Organization SSO configuration (enterprise IdP settings per organization).

CREATE TYPE "SsoProtocol" AS ENUM ('SAML', 'OIDC');

CREATE TABLE "organization_sso_configs" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "ssoEnabled" BOOLEAN NOT NULL DEFAULT false,
    "ssoProtocol" "SsoProtocol",
    "ssoMetadataUrl" TEXT,
    "ssoEntityId" TEXT,
    "ssoAcsUrl" TEXT,
    "ssoCertificate" TEXT,
    "ssoClientId" TEXT,
    "ssoClientSecret" TEXT,
    "ssoIssuer" TEXT,
    "ssoRedirectUri" TEXT,
    "ssoLogoutUrl" TEXT,
    "ssoJwksUrl" TEXT,
    "roleMappings" JSONB,
    "previousCertificates" JSONB,
    "metadataCache" JSONB,
    "metadataFetchedAt" TIMESTAMP(3),
    "metadataValidatedAt" TIMESTAMP(3),
    "allowSelfSignedCerts" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_sso_configs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "organization_sso_configs_organizationId_key" ON "organization_sso_configs"("organizationId");

ALTER TABLE "organization_sso_configs" ADD CONSTRAINT "organization_sso_configs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
