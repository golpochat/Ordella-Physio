import { BadRequestException, Injectable } from "@nestjs/common";
import { SAML } from "@node-saml/node-saml";
import { enterpriseConfig } from "@ordella/config";
import type { OrganizationSsoInternalConfig } from "@/integrations/organization-service.client";

@Injectable()
export class SsoSamlService {
  buildSpEntityId(tenantId: string): string {
    return `ordella-${tenantId}`;
  }

  buildSamlClient(tenantId: string, config: OrganizationSsoInternalConfig): SAML {
    const certificates = [config.ssoCertificate, ...config.previousCertificates].filter(
      (value): value is string => Boolean(value),
    );

    if (!certificates.length) {
      throw new BadRequestException("SAML signing certificate is not configured.");
    }

    return new SAML({
      issuer: this.buildSpEntityId(tenantId),
      callbackUrl: enterpriseConfig.samlAcsUrl,
      idpCert: certificates,
      entryPoint: config.ssoAcsUrl ?? undefined,
      audience: this.buildSpEntityId(tenantId),
      identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
      wantAssertionsSigned: true,
      signatureAlgorithm: "sha256",
      digestAlgorithm: "sha256",
      acceptedClockSkewMs: 60_000,
    });
  }

  async createLoginRedirect(tenantId: string, config: OrganizationSsoInternalConfig): Promise<string> {
    const saml = this.buildSamlClient(tenantId, config);
    return saml.getAuthorizeUrlAsync(tenantId, undefined, {});
  }

  async validateAssertion(
    tenantId: string,
    config: OrganizationSsoInternalConfig,
    body: Record<string, string>,
  ) {
    const saml = this.buildSamlClient(tenantId, config);
    const result = await saml.validatePostResponseAsync(body);

    const profile = result.profile;
    if (!profile) {
      throw new BadRequestException("SAML assertion profile is missing.");
    }

    const email =
      (typeof profile.email === "string" && profile.email) ||
      (typeof profile.nameID === "string" && profile.nameID.includes("@") ? profile.nameID : null);

    if (!email) {
      throw new BadRequestException("SAML assertion does not include an email or email nameID.");
    }

    const groups = this.extractGroups(profile);

    return {
      email: email.toLowerCase(),
      firstName: typeof profile.givenName === "string" ? profile.givenName : undefined,
      lastName: typeof profile.familyName === "string" ? profile.familyName : undefined,
      ssoSubject:
        (typeof profile.nameID === "string" && profile.nameID) ||
        (typeof profile.nameID === "object" && profile.nameID
          ? String((profile.nameID as { value?: string }).value ?? email)
          : email),
      groups,
    };
  }

  private extractGroups(profile: Record<string, unknown>): string[] {
    const raw =
      profile.groups ??
      profile.Group ??
      profile.memberOf ??
      profile["http://schemas.microsoft.com/ws/2008/06/identity/claims/groups"];

    if (Array.isArray(raw)) {
      return raw.map((entry) => String(entry));
    }

    if (typeof raw === "string") {
      return [raw];
    }

    return [];
  }
}
