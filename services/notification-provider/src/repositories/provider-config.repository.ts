import { Injectable } from "@nestjs/common";

import type { NotificationChannel, NotificationProviderName, Prisma } from "@/generated/prisma";

import { DatabaseService } from "@/database/database.module";

import type { ProviderConfigRecord } from "@/models/ProviderConfig";



export type CreateProviderConfigInput = {

  tenantId: string;

  channel: NotificationChannel;

  provider: NotificationProviderName;

  credentials: Record<string, unknown>;

  isActive?: boolean;

  priority?: number;

};



@Injectable()

export class ProviderConfigRepository {

  constructor(private readonly database: DatabaseService) {}



  create(input: CreateProviderConfigInput): Promise<ProviderConfigRecord> {

    return this.database.providerConfig.create({

      data: {

        tenantId: input.tenantId,

        channel: input.channel,

        provider: input.provider,

        credentials: input.credentials as Prisma.InputJsonValue,

        isActive: input.isActive ?? true,

        priority: input.priority ?? 1,

      },

    }) as Promise<ProviderConfigRecord>;

  }



  findById(id: string): Promise<ProviderConfigRecord | null> {

    return this.database.providerConfig.findUnique({ where: { id } }) as Promise<ProviderConfigRecord | null>;

  }



  update(id: string, data: Prisma.ProviderConfigUpdateInput): Promise<ProviderConfigRecord> {

    return this.database.providerConfig.update({ where: { id }, data }) as Promise<ProviderConfigRecord>;

  }



  listByTenant(tenantId: string): Promise<ProviderConfigRecord[]> {

    return this.database.providerConfig.findMany({

      where: { tenantId },

      orderBy: [{ channel: "asc" }, { priority: "asc" }],

    }) as Promise<ProviderConfigRecord[]>;

  }



  listAllForHealthCheck(): Promise<ProviderConfigRecord[]> {
    return this.database.providerConfig.findMany({
      where: {
        isActive: true,
        provider: { not: "NONE" },
      },
      orderBy: { updatedAt: "desc" },
    }) as Promise<ProviderConfigRecord[]>;
  }

  listActiveByTenantAndChannel(

    tenantId: string,

    channel: NotificationChannel,

  ): Promise<ProviderConfigRecord[]> {

    return this.database.providerConfig.findMany({

      where: {

        tenantId,

        channel,

        isActive: true,
        isHealthy: true,
        provider: { not: "NONE" },

      },

      orderBy: { priority: "asc" },

    }) as Promise<ProviderConfigRecord[]>;

  }

}


