import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { SearchQueryLogRecord } from "@/models/SearchQueryLog";

@Injectable()
export class SearchQueryLogRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    indexName: string;
    query: string;
    filters?: Record<string, unknown>;
    totalHits: number;
    durationMs: number;
  }): Promise<SearchQueryLogRecord> {
    return this.database.searchQueryLog.create({
      data: {
        tenantId: input.tenantId,
        indexName: input.indexName,
        query: input.query,
        filters: (input.filters ?? null) as Prisma.InputJsonValue,
        totalHits: input.totalHits,
        durationMs: input.durationMs,
      },
    });
  }

  async getAnalytics(tenantId: string, dateStart?: Date, dateEnd?: Date) {
    const where: Prisma.SearchQueryLogWhereInput = {
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

    const logs = await this.database.searchQueryLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 5000,
    });

    const queryCounts = new Map<string, number>();
    const zeroResultQueries = new Map<string, number>();
    const indexHits = new Map<string, number>();
    const slowQueries: Array<{ query: string; indexName: string; durationMs: number }> = [];

    for (const log of logs) {
      const key = `${log.indexName}::${log.query.toLowerCase()}`;
      queryCounts.set(key, (queryCounts.get(key) ?? 0) + 1);
      indexHits.set(log.indexName, (indexHits.get(log.indexName) ?? 0) + log.totalHits);

      if (log.totalHits === 0) {
        zeroResultQueries.set(key, (zeroResultQueries.get(key) ?? 0) + 1);
      }

      if (log.durationMs >= 200) {
        slowQueries.push({
          query: log.query,
          indexName: log.indexName,
          durationMs: log.durationMs,
        });
      }
    }

    const topQueries = [...queryCounts.entries()]
      .map(([key, count]) => {
        const [indexName, query] = key.split("::");
        return { indexName, query, count };
      })
      .sort((left, right) => right.count - left.count)
      .slice(0, 10);

    const topZeroResultQueries = [...zeroResultQueries.entries()]
      .map(([key, count]) => {
        const [indexName, query] = key.split("::");
        return { indexName, query, count };
      })
      .sort((left, right) => right.count - left.count)
      .slice(0, 10);

    const hitsPerIndex = Object.fromEntries(indexHits.entries());
    const slowestQueries = slowQueries.sort((left, right) => right.durationMs - left.durationMs).slice(0, 10);

    return {
      topQueries,
      zeroResultQueries: topZeroResultQueries,
      slowestQueries,
      hitsPerIndex,
      totalQueries: logs.length,
    };
  }

  findRecentQueries(tenantId: string, indexName: string, take = 1000): Promise<SearchQueryLogRecord[]> {
    return this.database.searchQueryLog.findMany({
      where: { tenantId, indexName },
      orderBy: { createdAt: "desc" },
      take,
    });
  }

  async findCoOccurringQueries(tenantId: string, indexName: string, query: string) {
    const logs = await this.database.searchQueryLog.findMany({
      where: { tenantId, indexName },
      orderBy: { createdAt: "desc" },
      take: 3000,
    });

    const normalized = query.trim().toLowerCase();
    const buckets = new Map<string, Set<string>>();

    for (const log of logs) {
      const bucketKey = log.createdAt.toISOString().slice(0, 13);
      const bucket = buckets.get(bucketKey) ?? new Set<string>();
      bucket.add(log.query.trim().toLowerCase());
      buckets.set(bucketKey, bucket);
    }

    const coCounts = new Map<string, number>();
    for (const queries of buckets.values()) {
      if (!queries.has(normalized)) {
        continue;
      }

      for (const candidate of queries) {
        if (candidate === normalized) {
          continue;
        }
        coCounts.set(candidate, (coCounts.get(candidate) ?? 0) + 1);
      }
    }

    return [...coCounts.entries()]
      .map(([candidate, count]) => ({ query: candidate, count }))
      .sort((left, right) => right.count - left.count);
  }
}
