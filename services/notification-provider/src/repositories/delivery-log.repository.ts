import { Injectable } from "@nestjs/common";

import type {

  DeliveryStatus,

  NotificationChannel,

  NotificationProviderName,

  Prisma,

} from "@/generated/prisma";

import { DatabaseService } from "@/database/database.module";

import type { DeliveryLogRecord } from "@/models/DeliveryLog";



export type CreateDeliveryLogInput = {

  tenantId: string;

  channel: NotificationChannel;

  provider: NotificationProviderName;

  status: DeliveryStatus;

  errorMessage?: string | null;

  requestPayload: Record<string, unknown>;

  responsePayload?: Record<string, unknown> | null;

  retryCount?: number;

  nextAttemptAt?: Date | null;

};



export type ListDeliveryLogsFilters = {

  tenantId: string;

  channel?: NotificationChannel;

  provider?: NotificationProviderName;

  status?: DeliveryStatus;

  dateStart?: Date;

  dateEnd?: Date;

  keyword?: string;

  page: number;

  limit: number;

};



@Injectable()

export class DeliveryLogRepository {

  constructor(private readonly database: DatabaseService) {}



  create(input: CreateDeliveryLogInput): Promise<DeliveryLogRecord> {

    return this.database.deliveryLog.create({

      data: {

        tenantId: input.tenantId,

        channel: input.channel,

        provider: input.provider,

        status: input.status,

        errorMessage: input.errorMessage ?? null,

        requestPayload: input.requestPayload as Prisma.InputJsonValue,

        responsePayload: (input.responsePayload ?? null) as Prisma.InputJsonValue,

        retryCount: input.retryCount ?? 0,

        nextAttemptAt: input.nextAttemptAt ?? null,

      },

    }) as Promise<DeliveryLogRecord>;

  }



  findById(id: string): Promise<DeliveryLogRecord | null> {

    return this.database.deliveryLog.findUnique({ where: { id } }) as Promise<DeliveryLogRecord | null>;

  }



  update(id: string, data: Prisma.DeliveryLogUpdateInput): Promise<DeliveryLogRecord> {

    return this.database.deliveryLog.update({ where: { id }, data }) as Promise<DeliveryLogRecord>;

  }



  findDueRetries(before: Date, maxRetries: number): Promise<DeliveryLogRecord[]> {

    return this.database.deliveryLog.findMany({

      where: {

        status: "FAILED",

        nextAttemptAt: { lte: before },

        retryCount: { lt: maxRetries },

      },

      orderBy: { nextAttemptAt: "asc" },

      take: 100,

    }) as Promise<DeliveryLogRecord[]>;

  }



  async list(filters: ListDeliveryLogsFilters): Promise<{ data: DeliveryLogRecord[]; total: number }> {

    const where: Prisma.DeliveryLogWhereInput = {

      tenantId: filters.tenantId,

      ...(filters.channel ? { channel: filters.channel } : {}),

      ...(filters.provider ? { provider: filters.provider } : {}),

      ...(filters.status ? { status: filters.status } : {}),

      ...(filters.dateStart || filters.dateEnd

        ? {

            createdAt: {

              ...(filters.dateStart ? { gte: filters.dateStart } : {}),

              ...(filters.dateEnd ? { lte: filters.dateEnd } : {}),

            },

          }

        : {}),

      ...(filters.keyword

        ? {

            OR: [
              { errorMessage: { contains: filters.keyword, mode: "insensitive" } },
              { requestPayload: { string_contains: filters.keyword } },
            ],

          }

        : {}),

    };



    const skip = (filters.page - 1) * filters.limit;



    const [data, total] = await this.database.$transaction([

      this.database.deliveryLog.findMany({

        where,

        orderBy: { createdAt: "desc" },

        skip,

        take: filters.limit,

      }),

      this.database.deliveryLog.count({ where }),

    ]);



    return { data: data as DeliveryLogRecord[], total };
  }

  async aggregateStats(
    tenantId: string,
    dateStart?: Date,
    dateEnd?: Date,
  ): Promise<{
    totals: { sent: number; failed: number };
    byChannel: Record<NotificationChannel, { sent: number; failed: number }>;
    byProvider: Record<NotificationProviderName, { sent: number; failed: number }>;
  }> {
    const where: Prisma.DeliveryLogWhereInput = {
      tenantId,
      ...(dateStart || dateEnd
        ? {
            createdAt: {
              ...(dateStart ? { gte: dateStart } : {}),
              ...(dateEnd ? { lte: dateEnd } : {}),
            },
          }
        : {}),
    };

    const [byChannelStatus, byProviderStatus] = await Promise.all([
      this.database.deliveryLog.groupBy({
        by: ["channel", "status"],
        where,
        _count: { _all: true },
      }),
      this.database.deliveryLog.groupBy({
        by: ["provider", "status"],
        where,
        _count: { _all: true },
      }),
    ]);

    const byChannel = {} as Record<NotificationChannel, { sent: number; failed: number }>;
    const byProvider = {} as Record<NotificationProviderName, { sent: number; failed: number }>;
    let sent = 0;
    let failed = 0;

    for (const row of byChannelStatus) {
      const bucket = byChannel[row.channel] ?? { sent: 0, failed: 0 };
      const count = row._count._all;

      if (row.status === "SUCCESS") {
        bucket.sent += count;
        sent += count;
      } else {
        bucket.failed += count;
        failed += count;
      }

      byChannel[row.channel] = bucket;
    }

    for (const row of byProviderStatus) {
      const bucket = byProvider[row.provider] ?? { sent: 0, failed: 0 };
      const count = row._count._all;

      if (row.status === "SUCCESS") {
        bucket.sent += count;
      } else {
        bucket.failed += count;
      }

      byProvider[row.provider] = bucket;
    }

    return {
      totals: { sent, failed },
      byChannel,
      byProvider,
    };
  }
}


