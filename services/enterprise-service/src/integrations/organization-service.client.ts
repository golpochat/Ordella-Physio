import { Injectable } from "@nestjs/common";
import { enterpriseConfig } from "@ordella/config";
import type { UpsertOrganizationSsoConfigInput } from "@ordella/validation";

export type OrganizationSsoInternalConfig = {
  organizationId: string;
  ssoEnabled: boolean;
  ssoProtocol: "SAML" | "OIDC" | null;
  ssoMetadataUrl: string | null;
  ssoEntityId: string | null;
  ssoAcsUrl: string | null;
  ssoCertificate: string | null;
  previousCertificates: string[];
  ssoClientId: string | null;
  ssoClientSecret: string | null;
  ssoIssuer: string | null;
  ssoRedirectUri: string | null;
  ssoLogoutUrl: string | null;
  ssoJwksUrl: string | null;
  roleMappings: Record<string, string>;
  metadataFetchedAt: string | Date | null;
  metadataValidatedAt: string | Date | null;
  allowSelfSignedCerts: boolean;
};

@Injectable()
export class OrganizationServiceClient {
  private get baseUrl(): string {
    return enterpriseConfig.organizationServiceUrl.replace(/\/$/, "");
  }

  async getSsoConfigByTenant(tenantId: string): Promise<OrganizationSsoInternalConfig> {
    const response = await fetch(`${this.baseUrl}/organizations/internal/tenants/${tenantId}/sso`);
    if (!response.ok) {
      throw new Error(`Organization SSO config unavailable (${response.status}).`);
    }

    return (await response.json()) as OrganizationSsoInternalConfig;
  }

  async upsertSsoConfig(organizationId: string, payload: UpsertOrganizationSsoConfigInput) {
    const response = await fetch(`${this.baseUrl}/organizations/internal/${organizationId}/sso`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(body?.message ?? `Failed to save organization SSO config (${response.status}).`);
    }

    return response.json();
  }
}
