import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { PROVIDER_SEEDS } from "@/constants/providers.seed";

@Injectable()
export class MarketplaceRepository {
  constructor(private readonly db: DatabaseService) {}

  async ensureProvidersSeeded() {
    for (const seed of PROVIDER_SEEDS) {
      await this.db.integrationProvider.upsert({
        where: { slug: seed.slug },
        create: seed,
        update: {
          name: seed.name,
          category: seed.category,
          description: seed.description,
          authType: seed.authType,
        },
      });
    }
  }

  listProviders() {
    return this.db.integrationProvider.findMany({ orderBy: { name: "asc" } });
  }

  findProviderById(id: string) {
    return this.db.integrationProvider.findUnique({ where: { id } });
  }

  findProviderBySlug(slug: string) {
    return this.db.integrationProvider.findUnique({ where: { slug } });
  }

  listTenantIntegrations(tenantId: string) {
    return this.db.tenantIntegration.findMany({
      where: { tenantId },
      include: { provider: true },
      orderBy: { updatedAt: "desc" },
    });
  }

  findTenantIntegration(tenantId: string, integrationId: string) {
    return this.db.tenantIntegration.findFirst({
      where: { id: integrationId, tenantId },
      include: { provider: true },
    });
  }

  findByTenantAndProvider(tenantId: string, providerId: string) {
    return this.db.tenantIntegration.findUnique({
      where: { tenantId_providerId: { tenantId, providerId } },
      include: { provider: true },
    });
  }

  upsertIntegration(data: {
    tenantId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    apiKey?: string | null;
    apiSecret?: string | null;
    expiresAt?: Date | null;
    metadata?: Prisma.InputJsonValue;
    status?: string;
  }) {
    return this.db.tenantIntegration.upsert({
      where: { tenantId_providerId: { tenantId: data.tenantId, providerId: data.providerId } },
      create: data,
      update: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        apiKey: data.apiKey,
        apiSecret: data.apiSecret,
        expiresAt: data.expiresAt,
        metadata: data.metadata,
        status: data.status ?? "connected",
      },
      include: { provider: true },
    });
  }

  disconnectIntegration(tenantId: string, integrationId: string) {
    return this.db.tenantIntegration.deleteMany({
      where: { id: integrationId, tenantId },
    });
  }

  createOAuthState(input: {
    tenantId: string;
    providerId: string;
    userId: string;
    state: string;
    expiresAt: Date;
  }) {
    return this.db.oAuthState.create({ data: input });
  }

  consumeOAuthState(state: string) {
    return this.db.oAuthState.findUnique({ where: { state } });
  }

  deleteOAuthState(state: string) {
    return this.db.oAuthState.deleteMany({ where: { state } });
  }

  logUsage(input: {
    tenantId: string;
    integrationId: string;
    action: string;
    status: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.integrationUsageLog.create({ data: input });
  }

  listUsageLogs(tenantId: string, integrationId?: string, limit = 50) {
    return this.db.integrationUsageLog.findMany({
      where: {
        tenantId,
        ...(integrationId ? { integrationId } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
