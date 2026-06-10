import { BadRequestException, Injectable } from "@nestjs/common";
import { enterpriseConfig } from "@ordella/config";
import { randomBytes } from "crypto";
import type { UpsertSsoConfigInput } from "@ordella/validation";
import { EnterpriseRepository } from "@/enterprise/enterprise.repository";
import { maskSecret } from "@/utils/enterprise-helpers";

@Injectable()
export class SsoService {
  constructor(private readonly repository: EnterpriseRepository) {}

  listConfigs(tenantId: string) {
    return this.repository.listSsoConfigs(tenantId).then((configs) =>
      configs.map((config) => this.toSsoResponse(config)),
    );
  }

  upsertConfig(tenantId: string, input: UpsertSsoConfigInput) {
    return this.repository
      .upsertSsoConfig({
        tenantId,
        provider: input.provider,
        name: input.name,
        isEnabled: input.isEnabled ?? false,
        entityId: input.entityId,
        ssoUrl: input.ssoUrl,
        certificate: input.certificate,
        clientId: input.clientId,
        clientSecret: input.clientSecret,
        issuerUrl: input.issuerUrl,
        metadataUrl: input.metadataUrl,
        redirectUri: input.redirectUri ?? enterpriseConfig.ssoCallbackUrl,
        scopes: input.scopes,
        attributeMap: input.attributeMap,
      })
      .then((config) => this.toSsoResponse(config));
  }

  deleteConfig(tenantId: string, provider: string) {
    return this.repository.deleteSsoConfig(tenantId, provider);
  }

  getSamlMetadata(tenantId: string) {
    const config = enterpriseConfig;
    return {
      entityId: `ordella-${tenantId}`,
      acsUrl: config.samlAcsUrl,
      sloUrl: config.samlAcsUrl,
      certificate: "PLACEHOLDER_SP_CERT",
    };
  }

  handleSamlAcs(tenantId: string, _payload: unknown) {
    return {
      status: "authenticated",
      tenantId,
      provider: "saml",
      redirectUrl: configFrontendCallback(),
    };
  }

  createOAuthAuthorizationUrl(tenantId: string, provider: string) {
    const sso = this.repository.findSsoConfig(tenantId, provider);
    return sso.then((config) => {
      if (!config?.isEnabled || !config.clientId) {
        throw new BadRequestException("SSO provider not configured");
      }

      const state = randomBytes(16).toString("hex");
      const redirectUri = config.redirectUri ?? enterpriseConfig.ssoCallbackUrl;

      if (provider === "azure_ad") {
        const issuer = config.issuerUrl ?? "https://login.microsoftonline.com/common/v2.0";
        const authUrl = new URL(`${issuer}/authorize`);
        authUrl.searchParams.set("client_id", config.clientId);
        authUrl.searchParams.set("response_type", "code");
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("scope", "openid profile email");
        authUrl.searchParams.set("state", `${tenantId}:${state}`);
        return { authUrl: authUrl.toString(), provider };
      }

      if (provider === "google_workspace") {
        const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        authUrl.searchParams.set("client_id", config.clientId);
        authUrl.searchParams.set("response_type", "code");
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("scope", "openid email profile");
        authUrl.searchParams.set("state", `${tenantId}:${state}`);
        return { authUrl: authUrl.toString(), provider };
      }

      if (provider === "oauth2" && config.issuerUrl) {
        const authUrl = new URL(`${config.issuerUrl.replace(/\/$/, "")}/authorize`);
        authUrl.searchParams.set("client_id", config.clientId);
        authUrl.searchParams.set("response_type", "code");
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("state", `${tenantId}:${state}`);
        return { authUrl: authUrl.toString(), provider };
      }

      throw new BadRequestException(`Unsupported SSO provider: ${provider}`);
    });
  }

  handleOAuthCallback(code: string, state: string) {
    const [tenantId, providerState] = state.split(":");
    return {
      status: "connected",
      tenantId,
      code,
      providerState,
      redirectUrl: configFrontendCallback(),
    };
  }

  private toSsoResponse(config: {
    id: string;
    tenantId: string;
    provider: string;
    name: string;
    isEnabled: boolean;
    entityId: string | null;
    ssoUrl: string | null;
    clientId: string | null;
    clientSecret: string | null;
    issuerUrl: string | null;
    metadataUrl: string | null;
    redirectUri: string | null;
    scopes: unknown;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: config.id,
      tenantId: config.tenantId,
      provider: config.provider,
      name: config.name,
      isEnabled: config.isEnabled,
      entityId: config.entityId,
      ssoUrl: config.ssoUrl,
      clientId: config.clientId,
      clientSecretMasked: maskSecret(config.clientSecret),
      issuerUrl: config.issuerUrl,
      metadataUrl: config.metadataUrl,
      redirectUri: config.redirectUri,
      scopes: config.scopes,
      createdAt: config.createdAt.toISOString(),
      updatedAt: config.updatedAt.toISOString(),
    };
  }
}

function configFrontendCallback() {
  return enterpriseConfig.frontendCallbackUrl;
}
