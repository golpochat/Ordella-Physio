import { Injectable } from "@nestjs/common";
import { SSO_BLOCKED_ROLES, SSO_DEFAULT_ROLE } from "@ordella/shared";
import { AuthServiceClient } from "@/integrations/auth-service.client";
import type { OrganizationSsoInternalConfig } from "@/integrations/organization-service.client";

export type SsoIdentity = {
  email: string;
  firstName?: string;
  lastName?: string;
  ssoSubject: string;
  groups?: string[];
};

@Injectable()
export class SsoProvisioningService {
  constructor(private readonly authServiceClient: AuthServiceClient) {}

  resolveRole(config: OrganizationSsoInternalConfig, groups: string[] = []): string {
    const mappings = config.roleMappings ?? {};
    for (const group of groups) {
      const mapped = mappings[group];
      if (mapped && !SSO_BLOCKED_ROLES.includes(mapped as (typeof SSO_BLOCKED_ROLES)[number])) {
        return mapped;
      }
    }

    return SSO_DEFAULT_ROLE;
  }

  async provisionUser(input: {
    tenantId: string;
    organizationId: string;
    config: OrganizationSsoInternalConfig;
    identity: SsoIdentity;
    protocol: "SAML" | "OIDC";
    ipAddress?: string;
    deviceInfo?: string;
  }) {
    if (input.identity.email.trim().toLowerCase().endsWith("@ordella.system")) {
      throw new Error("Invalid SSO identity.");
    }

    const role = this.resolveRole(input.config, input.identity.groups);

    return this.authServiceClient.completeSsoLogin({
      tenantId: input.tenantId,
      organizationId: input.organizationId,
      email: input.identity.email,
      firstName: input.identity.firstName,
      lastName: input.identity.lastName,
      ssoSubject: input.identity.ssoSubject,
      ssoProvider: input.protocol,
      role,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
    });
  }
}
