import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes } from "crypto";
import { enterpriseConfig } from "@ordella/config";
import type { UpsertOrganizationSsoConfigInput, UpsertSsoConfigInput } from "@ordella/validation";
import { SSO_STATE_TTL_MS } from "@ordella/shared";
import { EnterpriseRepository } from "@/enterprise/enterprise.repository";
import { SsoAuditService } from "@/enterprise/sso-audit.service";
import { SsoOidcService } from "@/enterprise/sso-oidc.service";
import { SsoProvisioningService } from "@/enterprise/sso-provisioning.service";
import { SsoSamlService } from "@/enterprise/sso-saml.service";
import { AuthServiceClient } from "@/integrations/auth-service.client";
import {
  OrganizationServiceClient,
  type OrganizationSsoInternalConfig,
} from "@/integrations/organization-service.client";

@Injectable()
export class SsoService {
  constructor(
    private readonly repository: EnterpriseRepository,
    private readonly organizationClient: OrganizationServiceClient,
    private readonly authServiceClient: AuthServiceClient,
    private readonly samlService: SsoSamlService,
    private readonly oidcService: SsoOidcService,
    private readonly provisioningService: SsoProvisioningService,
    private readonly auditService: SsoAuditService,
  ) {}

  async listConfigs(tenantId: string) {
    const config = await this.loadConfig(tenantId);
    if (!config.ssoEnabled) {
      return [];
    }

    return [
      {
        id: config.organizationId,
        tenantId,
        provider: config.ssoProtocol === "SAML" ? "saml" : "oidc",
        name: config.ssoProtocol === "SAML" ? "SAML 2.0" : "OpenID Connect",
        isEnabled: config.ssoEnabled,
        entityId: config.ssoEntityId,
        ssoUrl: config.ssoAcsUrl,
        clientId: config.ssoClientId,
        issuerUrl: config.ssoIssuer,
        metadataUrl: config.ssoMetadataUrl,
        redirectUri: config.ssoRedirectUri,
        scopes: ["openid", "profile", "email"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async upsertConfig(tenantId: string, input: UpsertSsoConfigInput) {
    const existing = await this.organizationClient.getSsoConfigByTenant(tenantId).catch(() => null);
    const organizationId = existing?.organizationId;
    if (!organizationId) {
      throw new NotFoundException("Organization is not linked to this tenant.");
    }

    const payload = this.mapLegacyUpsert(input);
    return this.organizationClient.upsertSsoConfig(organizationId, payload);
  }

  async deleteConfig(tenantId: string, _provider: string) {
    const config = await this.loadConfig(tenantId);
    return this.organizationClient.upsertSsoConfig(config.organizationId, { ssoEnabled: false });
  }

  async getSamlMetadata(tenantId: string) {
    return {
      entityId: this.samlService.buildSpEntityId(tenantId),
      acsUrl: enterpriseConfig.samlAcsUrl,
      sloUrl: enterpriseConfig.samlAcsUrl,
      certificate: "CONFIGURED_AT_DEPLOYMENT",
    };
  }

  async startSamlLogin(tenantId: string) {
    const config = await this.requireEnabledConfig(tenantId, "SAML");
    const authUrl = await this.samlService.createLoginRedirect(tenantId, config);
    return { authUrl, protocol: "SAML" as const };
  }

  async handleSamlAcs(
    tenantId: string,
    body: Record<string, string>,
    options?: { ipAddress?: string; deviceInfo?: string },
  ) {
    const config = await this.requireEnabledConfig(tenantId, "SAML");

    try {
      const identity = await this.samlService.validateAssertion(tenantId, config, body);
      const session = await this.provisioningService.provisionUser({
        tenantId,
        organizationId: config.organizationId,
        config,
        identity: {
          email: identity.email,
          firstName: identity.firstName,
          lastName: identity.lastName,
          ssoSubject: identity.ssoSubject,
          groups: identity.groups,
        },
        protocol: "SAML",
        ipAddress: options?.ipAddress,
        deviceInfo: options?.deviceInfo,
      });

      void this.auditService.loginSuccess({
        tenantId,
        organizationId: config.organizationId,
        actorId: session.user.id,
        protocol: "SAML",
        ipAddress: options?.ipAddress,
      });

      return this.buildFrontendRedirect(session);
    } catch (error) {
      void this.auditService.loginFailure({
        tenantId,
        organizationId: config.organizationId,
        protocol: "SAML",
        ipAddress: options?.ipAddress,
        metadata: { reason: error instanceof Error ? error.message : "unknown" },
      });
      throw error;
    }
  }

  async startOidcLogin(tenantId: string) {
    const config = await this.requireEnabledConfig(tenantId, "OIDC");
    const state = randomBytes(24).toString("hex");
    const nonce = randomBytes(24).toString("hex");
    const redirectUri = config.ssoRedirectUri ?? enterpriseConfig.ssoCallbackUrl;

    await this.repository.createSsoAuthState({
      state,
      nonce,
      tenantId,
      organizationId: config.organizationId,
      protocol: "OIDC",
      redirectUri,
      expiresAt: new Date(Date.now() + SSO_STATE_TTL_MS),
    });

    const authUrl = await this.oidcService.createAuthorizationUrl(config, state, nonce);
    return { authUrl, state, protocol: "OIDC" as const };
  }

  async handleOidcCallback(
    code: string,
    state: string,
    callbackUrl: URL,
    options?: { ipAddress?: string; deviceInfo?: string },
  ) {
    const authState = await this.repository.consumeSsoAuthState(state);
    if (!authState || authState.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired SSO state.");
    }

    const config = await this.requireEnabledConfig(authState.tenantId, "OIDC");

    try {
      const identity = await this.oidcService.exchangeCode(
        config,
        callbackUrl,
        state,
        authState.nonce,
      );

      const session = await this.provisioningService.provisionUser({
        tenantId: authState.tenantId,
        organizationId: config.organizationId,
        config,
        identity: {
          email: identity.email,
          firstName: identity.firstName,
          lastName: identity.lastName,
          ssoSubject: identity.ssoSubject,
          groups: identity.groups,
        },
        protocol: "OIDC",
        ipAddress: options?.ipAddress,
        deviceInfo: options?.deviceInfo,
      });

      await this.repository.deleteSsoAuthState(state);

      void this.auditService.loginSuccess({
        tenantId: authState.tenantId,
        organizationId: config.organizationId,
        actorId: session.user.id,
        protocol: "OIDC",
        ipAddress: options?.ipAddress,
      });

      return this.buildFrontendRedirect(session);
    } catch (error) {
      void this.auditService.loginFailure({
        tenantId: authState.tenantId,
        organizationId: config.organizationId,
        protocol: "OIDC",
        ipAddress: options?.ipAddress,
        metadata: { reason: error instanceof Error ? error.message : "unknown" },
      });
      throw error;
    }
  }

  async logout(input: {
    tenantId: string;
    userId: string;
    idTokenHint?: string;
    ipAddress?: string;
  }) {
    const config = await this.loadConfig(input.tenantId);
    await this.authServiceClient.revokeUserSessions(input.userId);

    void this.auditService.logout({
      tenantId: input.tenantId,
      organizationId: config.organizationId,
      actorId: input.userId,
      protocol: config.ssoProtocol === "SAML" ? "SAML" : "OIDC",
      ipAddress: input.ipAddress,
    });

    if (config.ssoProtocol === "OIDC") {
      const logoutUrl = await this.oidcService.buildLogoutUrl(config, input.idTokenHint);
      return { logoutUrl };
    }

    return { logoutUrl: config.ssoLogoutUrl };
  }

  private async loadConfig(tenantId: string): Promise<OrganizationSsoInternalConfig> {
    return this.organizationClient.getSsoConfigByTenant(tenantId);
  }

  private async requireEnabledConfig(tenantId: string, protocol: "SAML" | "OIDC") {
    const config = await this.loadConfig(tenantId);
    if (!config.ssoEnabled) {
      throw new BadRequestException("SSO is not enabled for this organization.");
    }

    if (config.ssoProtocol !== protocol) {
      throw new BadRequestException(`SSO protocol mismatch. Expected ${protocol}.`);
    }

    if (!config.metadataValidatedAt) {
      throw new BadRequestException("SSO metadata must be validated before login is allowed.");
    }

    return config;
  }

  private mapLegacyUpsert(input: UpsertSsoConfigInput): UpsertOrganizationSsoConfigInput {
    const protocol = input.provider === "saml" ? "SAML" : "OIDC";

    return {
      ssoEnabled: input.isEnabled ?? false,
      ssoProtocol: protocol,
      ssoMetadataUrl: input.metadataUrl,
      ssoEntityId: input.entityId,
      ssoAcsUrl: input.ssoUrl,
      ssoCertificate: input.certificate,
      ssoClientId: input.clientId,
      ssoClientSecret: input.clientSecret,
      ssoIssuer: input.issuerUrl,
      ssoRedirectUri: input.redirectUri ?? enterpriseConfig.ssoCallbackUrl,
      ssoLogoutUrl: input.logoutUrl,
      ssoJwksUrl: input.jwksUrl,
      roleMappings: input.attributeMap,
    };
  }

  private buildFrontendRedirect(session: {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
  }) {
    const redirect = new URL(enterpriseConfig.frontendCallbackUrl);
    redirect.searchParams.set("status", "success");
    redirect.searchParams.set("accessToken", session.accessToken);
    redirect.searchParams.set("refreshToken", session.refreshToken);
    redirect.searchParams.set("sessionId", session.sessionId);
    return { redirectUrl: redirect.toString() };
  }
}
