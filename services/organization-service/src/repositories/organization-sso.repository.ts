import { Injectable } from "@nestjs/common";
import type { OrganizationSsoConfig, Prisma, SsoProtocol } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

export type UpsertOrganizationSsoData = {
  organizationId: string;
  ssoEnabled?: boolean;
  ssoProtocol?: SsoProtocol | null;
  ssoMetadataUrl?: string | null;
  ssoEntityId?: string | null;
  ssoAcsUrl?: string | null;
  ssoCertificate?: string | null;
  ssoClientId?: string | null;
  ssoClientSecret?: string | null;
  ssoIssuer?: string | null;
  ssoRedirectUri?: string | null;
  ssoLogoutUrl?: string | null;
  ssoJwksUrl?: string | null;
  roleMappings?: Prisma.InputJsonValue | null;
  previousCertificates?: Prisma.InputJsonValue | null;
  metadataCache?: Prisma.InputJsonValue | null;
  metadataFetchedAt?: Date | null;
  metadataValidatedAt?: Date | null;
  allowSelfSignedCerts?: boolean;
};

@Injectable()
export class OrganizationSsoRepository {
  constructor(private readonly database: DatabaseService) {}

  findByOrganizationId(organizationId: string): Promise<OrganizationSsoConfig | null> {
    return this.database.organizationSsoConfig.findUnique({ where: { organizationId } });
  }

  findOrganizationIdByTenantId(tenantId: string): Promise<string | null> {
    return this.database.organizationTenant
      .findUnique({
        where: { tenantId },
        select: { organizationId: true },
      })
      .then((link) => link?.organizationId ?? null);
  }

  upsert(data: UpsertOrganizationSsoData): Promise<OrganizationSsoConfig> {
    const updateData: Prisma.OrganizationSsoConfigUpdateInput = {
      ssoEnabled: data.ssoEnabled,
      ssoProtocol: data.ssoProtocol ?? undefined,
      ssoMetadataUrl: data.ssoMetadataUrl,
      ssoEntityId: data.ssoEntityId,
      ssoAcsUrl: data.ssoAcsUrl,
      ssoCertificate: data.ssoCertificate,
      ssoClientId: data.ssoClientId,
      ssoClientSecret: data.ssoClientSecret,
      ssoIssuer: data.ssoIssuer,
      ssoRedirectUri: data.ssoRedirectUri,
      ssoLogoutUrl: data.ssoLogoutUrl,
      ssoJwksUrl: data.ssoJwksUrl,
      roleMappings: data.roleMappings ?? undefined,
      previousCertificates: data.previousCertificates ?? undefined,
      metadataCache: data.metadataCache ?? undefined,
      metadataFetchedAt: data.metadataFetchedAt,
      metadataValidatedAt: data.metadataValidatedAt,
      allowSelfSignedCerts: data.allowSelfSignedCerts,
    };

    return this.database.organizationSsoConfig.upsert({
      where: { organizationId: data.organizationId },
      create: {
        organization: { connect: { id: data.organizationId } },
        ssoEnabled: data.ssoEnabled ?? false,
        ssoProtocol: data.ssoProtocol ?? undefined,
        ssoMetadataUrl: data.ssoMetadataUrl,
        ssoEntityId: data.ssoEntityId,
        ssoAcsUrl: data.ssoAcsUrl,
        ssoCertificate: data.ssoCertificate,
        ssoClientId: data.ssoClientId,
        ssoClientSecret: data.ssoClientSecret,
        ssoIssuer: data.ssoIssuer,
        ssoRedirectUri: data.ssoRedirectUri,
        ssoLogoutUrl: data.ssoLogoutUrl,
        ssoJwksUrl: data.ssoJwksUrl,
        roleMappings: data.roleMappings ?? undefined,
        previousCertificates: data.previousCertificates ?? undefined,
        metadataCache: data.metadataCache ?? undefined,
        metadataFetchedAt: data.metadataFetchedAt,
        metadataValidatedAt: data.metadataValidatedAt,
        allowSelfSignedCerts: data.allowSelfSignedCerts ?? false,
      },
      update: updateData,
    });
  }
}
