import { BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type {
  ConnectIntegrationInput,
  DisconnectIntegrationInput,
  ExerciseSyncInput,
  GoogleCalendarSyncInput,
  SendEmailInput,
  SendSmsInput,
  UploadNoteInput,
} from "@ordella/validation";
import { IntegrationHooksService } from "@/marketplace/integration-hooks.service";
import { MarketplaceRepository } from "@/marketplace/marketplace.repository";
import { OAuthService } from "@/marketplace/oauth.service";
import { maskSecret, type AuthenticatedMarketplaceUser } from "@/utils/marketplace-helpers";

@Injectable()
export class MarketplaceService implements OnModuleInit {
  constructor(
    private readonly repository: MarketplaceRepository,
    private readonly oauthService: OAuthService,
    private readonly hooks: IntegrationHooksService,
  ) {}

  async onModuleInit() {
    await this.repository.ensureProvidersSeeded();
  }

  async listProviders() {
    const providers = await this.repository.listProviders();
    return providers.map((provider) => ({
      id: provider.id,
      slug: provider.slug,
      name: provider.name,
      category: provider.category,
      description: provider.description,
      authType: provider.authType,
      createdAt: provider.createdAt.toISOString(),
    }));
  }

  async listTenantIntegrations(tenantId: string) {
    const integrations = await this.repository.listTenantIntegrations(tenantId);
    return integrations.map((entry) => this.toIntegrationResponse(entry));
  }

  async connect(tenantId: string, user: AuthenticatedMarketplaceUser, input: ConnectIntegrationInput) {
    const provider = await this.repository.findProviderById(input.providerId);
    if (!provider) throw new BadRequestException("Provider not found");

    if (provider.authType === "oauth") {
      const { authUrl } = await this.oauthService.createAuthorizationUrl({
        tenantId,
        userId: user.userId,
        providerId: provider.id,
        providerSlug: provider.slug,
      });
      return { type: "oauth", authUrl, providerId: provider.id };
    }

    if (provider.authType === "apiKey") {
      if (!input.apiKey) {
        throw new BadRequestException("API key is required for this provider");
      }
      const integration = await this.repository.upsertIntegration({
        tenantId,
        providerId: provider.id,
        apiKey: input.apiKey,
        apiSecret: input.apiSecret ?? null,
        metadata: input.metadata as Prisma.InputJsonValue | undefined,
        status: "connected",
      });
      await this.repository.logUsage({
        tenantId,
        integrationId: integration.id,
        action: "connect_api_key",
        status: "success",
        metadata: { providerSlug: provider.slug },
      });
      return { type: "apiKey", integration: this.toIntegrationResponse(integration) };
    }

    if (provider.slug === "stripe") {
      const integration = await this.repository.upsertIntegration({
        tenantId,
        providerId: provider.id,
        status: "connected",
        metadata: { linkedVia: "billing-service" },
      });
      return { type: "linked", integration: this.toIntegrationResponse(integration) };
    }

    throw new BadRequestException(`Unsupported auth type: ${provider.authType}`);
  }

  async disconnect(tenantId: string, input: DisconnectIntegrationInput) {
    const integration = await this.repository.findTenantIntegration(tenantId, input.integrationId);
    if (!integration) throw new BadRequestException("Integration not found");

    await this.repository.disconnectIntegration(tenantId, input.integrationId);
    await this.repository.logUsage({
      tenantId,
      integrationId: integration.id,
      action: "disconnect",
      status: "success",
      metadata: { providerSlug: integration.provider.slug },
    });

    return { disconnected: true, integrationId: input.integrationId };
  }

  handleOAuthRedirect(code: string, state: string) {
    return this.oauthService.handleCallback(code, state);
  }

  async getUsageLogs(tenantId: string, integrationId?: string) {
    const logs = await this.repository.listUsageLogs(tenantId, integrationId);
    return logs.map((log) => ({
      id: log.id,
      tenantId: log.tenantId,
      integrationId: log.integrationId,
      action: log.action,
      status: log.status,
      metadata: log.metadata,
      createdAt: log.createdAt.toISOString(),
    }));
  }

  syncGoogleCalendar(tenantId: string, input: GoogleCalendarSyncInput) {
    return this.hooks.syncGoogleCalendar(tenantId, input);
  }

  uploadNote(tenantId: string, input: UploadNoteInput) {
    return this.hooks.uploadNote(tenantId, input);
  }

  sendSms(tenantId: string, input: SendSmsInput) {
    return this.hooks.sendSms(tenantId, input);
  }

  sendEmail(tenantId: string, input: SendEmailInput) {
    return this.hooks.sendEmail(tenantId, input);
  }

  syncExerciseProgram(tenantId: string, input: ExerciseSyncInput) {
    return this.hooks.syncExerciseProgram(tenantId, input);
  }

  async handleWebhook(providerSlug: string, payload: unknown) {
    const provider = await this.repository.findProviderBySlug(providerSlug);
    if (!provider) throw new BadRequestException("Unknown provider");

    return {
      received: true,
      providerSlug,
      processedAt: new Date().toISOString(),
      payload,
    };
  }

  private toIntegrationResponse(entry: {
    id: string;
    tenantId: string;
    providerId: string;
    accessToken: string | null;
    refreshToken: string | null;
    apiKey: string | null;
    apiSecret: string | null;
    expiresAt: Date | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    provider: {
      id: string;
      slug: string;
      name: string;
      category: string;
      description: string;
      authType: string;
    };
  }) {
    return {
      id: entry.id,
      tenantId: entry.tenantId,
      providerId: entry.providerId,
      provider: {
        id: entry.provider.id,
        slug: entry.provider.slug,
        name: entry.provider.name,
        category: entry.provider.category,
        description: entry.provider.description,
        authType: entry.provider.authType,
      },
      status: entry.status,
      hasAccessToken: Boolean(entry.accessToken),
      hasRefreshToken: Boolean(entry.refreshToken),
      apiKeyMasked: maskSecret(entry.apiKey),
      expiresAt: entry.expiresAt?.toISOString() ?? null,
      createdAt: entry.createdAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
    };
  }
}
