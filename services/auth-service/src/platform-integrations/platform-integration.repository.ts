import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

const RUNTIME_STATE_ID = "default";

@Injectable()
export class PlatformIntegrationRepository {
  constructor(private readonly db: DatabaseService) {}

  listAddressLookupIntegrations() {
    return this.db.platformIntegration.findMany({
      where: { category: "ADDRESS_LOOKUP" },
      orderBy: { createdAt: "asc" },
    });
  }

  findAddressLookupIntegrationById(id: string) {
    return this.db.platformIntegration.findFirst({
      where: { id, category: "ADDRESS_LOOKUP" },
    });
  }

  createAddressLookupIntegration(data: {
    vendor: string;
    label: string;
    credentialsEncrypted: string;
    apiKeyLast4: string | null;
    metadata: Prisma.InputJsonValue;
    updatedByUserId?: string | null;
  }) {
    return this.db.platformIntegration.create({
      data: {
        category: "ADDRESS_LOOKUP",
        vendor: data.vendor,
        label: data.label,
        credentialsEncrypted: data.credentialsEncrypted,
        apiKeyLast4: data.apiKeyLast4,
        metadata: data.metadata,
        updatedByUserId: data.updatedByUserId ?? null,
      },
    });
  }

  updateAddressLookupIntegration(
    id: string,
    data: {
      label?: string;
      credentialsEncrypted?: string;
      apiKeyLast4?: string | null;
      metadata?: Prisma.InputJsonValue;
      updatedByUserId?: string | null;
    },
  ) {
    return this.db.platformIntegration.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  deleteAddressLookupIntegration(id: string) {
    return this.db.platformIntegration.delete({ where: { id } });
  }

  getRuntimeState() {
    return this.db.platformRuntimeState.findUnique({
      where: { id: RUNTIME_STATE_ID },
      include: { activeAddressLookupIntegration: true },
    });
  }

  ensureRuntimeState() {
    return this.db.platformRuntimeState.upsert({
      where: { id: RUNTIME_STATE_ID },
      create: { id: RUNTIME_STATE_ID },
      update: {},
      include: { activeAddressLookupIntegration: true },
    });
  }

  setActiveAddressLookupIntegration(integrationId: string | null, updatedByUserId?: string | null) {
    return this.db.platformRuntimeState.upsert({
      where: { id: RUNTIME_STATE_ID },
      create: {
        id: RUNTIME_STATE_ID,
        activeAddressLookupIntegrationId: integrationId,
        updatedByUserId: updatedByUserId ?? null,
      },
      update: {
        activeAddressLookupIntegrationId: integrationId,
        updatedByUserId: updatedByUserId ?? null,
      },
      include: { activeAddressLookupIntegration: true },
    });
  }
}
