import { BadRequestException, Injectable } from "@nestjs/common";
import { marketplaceConfig } from "@ordella/config";
import { generateToken } from "@ordella/utils";
import { MarketplaceRepository } from "@/marketplace/marketplace.repository";

type OAuthProviderSlug = "google-calendar" | "dropbox" | "google-drive" | "onedrive" | "zoom";

@Injectable()
export class OAuthService {
  constructor(private readonly repository: MarketplaceRepository) {}

  async createAuthorizationUrl(input: {
    tenantId: string;
    userId: string;
    providerId: string;
    providerSlug: string;
  }) {
    const state = generateToken(24);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.repository.createOAuthState({
      tenantId: input.tenantId,
      providerId: input.providerId,
      userId: input.userId,
      state,
      expiresAt,
    });

    const redirectUri = marketplaceConfig.oauthCallbackUrl;
    const authUrl = this.buildAuthUrl(input.providerSlug as OAuthProviderSlug, state, redirectUri);

    return { authUrl, state };
  }

  async handleCallback(code: string, state: string) {
    const oauthState = await this.repository.consumeOAuthState(state);
    if (!oauthState || oauthState.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired OAuth state");
    }

    const provider = await this.repository.findProviderById(oauthState.providerId);
    if (!provider) {
      throw new BadRequestException("Provider not found");
    }

    const tokens = await this.exchangeCode(provider.slug, code, marketplaceConfig.oauthCallbackUrl);

    await this.repository.upsertIntegration({
      tenantId: oauthState.tenantId,
      providerId: oauthState.providerId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
      status: "connected",
    });

    await this.repository.deleteOAuthState(state);

    return {
      tenantId: oauthState.tenantId,
      providerSlug: provider.slug,
      frontendRedirect: marketplaceConfig.frontendCallbackUrl,
    };
  }

  private buildAuthUrl(slug: OAuthProviderSlug, state: string, redirectUri: string) {
    const encodedRedirect = encodeURIComponent(redirectUri);
    const encodedState = encodeURIComponent(state);

    switch (slug) {
      case "google-calendar":
      case "google-drive": {
        const clientId = marketplaceConfig.googleClientId;
        const scope =
          slug === "google-calendar"
            ? "https://www.googleapis.com/auth/calendar.events"
            : "https://www.googleapis.com/auth/drive.file";
        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodedRedirect}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent&state=${encodedState}`;
      }
      case "dropbox":
        return `https://www.dropbox.com/oauth2/authorize?client_id=${marketplaceConfig.dropboxClientId}&redirect_uri=${encodedRedirect}&response_type=code&token_access_type=offline&state=${encodedState}`;
      case "onedrive":
        return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${marketplaceConfig.onedriveClientId}&redirect_uri=${encodedRedirect}&response_type=code&scope=${encodeURIComponent("Files.ReadWrite offline_access")}&state=${encodedState}`;
      case "zoom":
        return `https://zoom.us/oauth/authorize?client_id=${marketplaceConfig.zoomClientId}&redirect_uri=${encodedRedirect}&response_type=code&state=${encodedState}`;
      default:
        throw new BadRequestException(`OAuth not supported for ${slug}`);
    }
  }

  private async exchangeCode(
    slug: string,
    code: string,
    redirectUri: string,
  ): Promise<{ accessToken: string; refreshToken?: string; expiresAt?: Date }> {
    const config = marketplaceConfig;

    if (slug === "google-calendar" || slug === "google-drive") {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: config.googleClientId ?? "",
          client_secret: config.googleClientSecret ?? "",
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });
      const payload = (await response.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
      };
      return {
        accessToken: payload.access_token ?? "",
        refreshToken: payload.refresh_token,
        expiresAt: payload.expires_in
          ? new Date(Date.now() + payload.expires_in * 1000)
          : undefined,
      };
    }

    if (slug === "dropbox") {
      const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id: config.dropboxClientId ?? "",
          client_secret: config.dropboxClientSecret ?? "",
          redirect_uri: redirectUri,
        }),
      });
      const payload = (await response.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
      };
      return {
        accessToken: payload.access_token ?? "",
        refreshToken: payload.refresh_token,
        expiresAt: payload.expires_in
          ? new Date(Date.now() + payload.expires_in * 1000)
          : undefined,
      };
    }

    if (slug === "onedrive") {
      const response = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: config.onedriveClientId ?? "",
          client_secret: config.onedriveClientSecret ?? "",
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });
      const payload = (await response.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
      };
      return {
        accessToken: payload.access_token ?? "",
        refreshToken: payload.refresh_token,
        expiresAt: payload.expires_in
          ? new Date(Date.now() + payload.expires_in * 1000)
          : undefined,
      };
    }

    if (slug === "zoom") {
      const credentials = Buffer.from(
        `${config.zoomClientId ?? ""}:${config.zoomClientSecret ?? ""}`,
      ).toString("base64");
      const response = await fetch("https://zoom.us/oauth/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
      });
      const payload = (await response.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
      };
      return {
        accessToken: payload.access_token ?? "",
        refreshToken: payload.refresh_token,
        expiresAt: payload.expires_in
          ? new Date(Date.now() + payload.expires_in * 1000)
          : undefined,
      };
    }

    throw new BadRequestException(`Token exchange not implemented for ${slug}`);
  }
}
