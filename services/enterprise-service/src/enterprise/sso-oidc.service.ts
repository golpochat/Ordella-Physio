import { BadRequestException, Injectable } from "@nestjs/common";
import type * as OpenIdClient from "openid-client";
import type { OrganizationSsoInternalConfig } from "@/integrations/organization-service.client";

type OpenIdClientModule = typeof OpenIdClient;

@Injectable()
export class SsoOidcService {
  private clientModule?: Promise<OpenIdClientModule>;

  private loadClient(): Promise<OpenIdClientModule> {
    if (!this.clientModule) {
      this.clientModule = import("openid-client") as Promise<OpenIdClientModule>;
    }

    return this.clientModule;
  }

  private async getConfiguration(
    config: OrganizationSsoInternalConfig,
  ): Promise<OpenIdClient.Configuration> {
    if (!config.ssoIssuer || !config.ssoClientId || !config.ssoClientSecret) {
      throw new BadRequestException("OIDC issuer, client ID, and client secret are required.");
    }

    const redirectUri = config.ssoRedirectUri;
    if (!redirectUri) {
      throw new BadRequestException("OIDC redirect URI is not configured.");
    }

    this.assertAllowedRedirectUri(redirectUri, config);

    const client = await this.loadClient();

    return client.discovery(
      new URL(config.ssoIssuer),
      config.ssoClientId,
      { client_secret: config.ssoClientSecret },
      client.ClientSecretPost(config.ssoClientSecret),
    );
  }

  assertAllowedRedirectUri(redirectUri: string, config: OrganizationSsoInternalConfig) {
    const allowed = new Set(
      [config.ssoRedirectUri].filter((value): value is string => Boolean(value)),
    );

    if (!allowed.has(redirectUri)) {
      throw new BadRequestException("Redirect URI is not allowed.");
    }
  }

  async createAuthorizationUrl(
    config: OrganizationSsoInternalConfig,
    state: string,
    nonce: string,
  ): Promise<string> {
    const client = await this.loadClient();
    const oidcConfig = await this.getConfiguration(config);
    const redirectUri = config.ssoRedirectUri!;

    const url = client.buildAuthorizationUrl(oidcConfig, {
      redirect_uri: redirectUri,
      scope: "openid profile email",
      state,
      nonce,
      response_type: "code",
    });

    return url.toString();
  }

  async exchangeCode(
    config: OrganizationSsoInternalConfig,
    callbackUrl: URL,
    expectedState: string,
    expectedNonce: string,
  ) {
    const client = await this.loadClient();
    const oidcConfig = await this.getConfiguration(config);
    const tokenSet = await client.authorizationCodeGrant(oidcConfig, callbackUrl, {
      expectedState,
      expectedNonce,
    });

    const claims = tokenSet.claims();
    if (!claims) {
      throw new BadRequestException("OIDC token claims are missing.");
    }

    const email = typeof claims.email === "string" ? claims.email : null;
    const subject = typeof claims.sub === "string" ? claims.sub : null;

    if (!email || !subject) {
      throw new BadRequestException("OIDC token must include email and sub claims.");
    }

    if (config.ssoIssuer && typeof claims.iss === "string" && claims.iss !== config.ssoIssuer) {
      throw new BadRequestException("OIDC token issuer is invalid.");
    }

    const audience = claims.aud;
    if (config.ssoClientId) {
      const audiences = Array.isArray(audience) ? audience : audience ? [audience] : [];
      if (!audiences.includes(config.ssoClientId)) {
        throw new BadRequestException("OIDC token audience is invalid.");
      }
    }

    const groups = Array.isArray(claims.groups)
      ? claims.groups.map((entry) => String(entry))
      : typeof claims.groups === "string"
        ? [claims.groups]
        : [];

    return {
      email: email.toLowerCase(),
      firstName: typeof claims.given_name === "string" ? claims.given_name : undefined,
      lastName: typeof claims.family_name === "string" ? claims.family_name : undefined,
      ssoSubject: subject,
      groups,
    };
  }

  async buildLogoutUrl(config: OrganizationSsoInternalConfig, idTokenHint?: string): Promise<string | null> {
    if (!config.ssoLogoutUrl && !config.ssoIssuer) {
      return null;
    }

    const client = await this.loadClient();
    const oidcConfig = await this.getConfiguration(config);
    const params: Record<string, string> = {};
    if (config.ssoRedirectUri) {
      params.post_logout_redirect_uri = config.ssoRedirectUri;
    }
    if (idTokenHint) {
      params.id_token_hint = idTokenHint;
    }

    const url = client.buildEndSessionUrl(oidcConfig, params);

    return url.toString();
  }
}
