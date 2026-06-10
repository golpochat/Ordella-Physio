import type { PrismaClient } from "@prisma/client";
import { TENANT_ID_FIELD } from "../constants/db-errors";
import type { PrismaClientLike } from "./client";

export type TenantScopedClient<TClient extends PrismaClientLike = PrismaClient> = TClient & {
  tenantId: string;
};

const tenantClientCache = new Map<string, unknown>();

export function createTenantClient<TClient extends PrismaClientLike>(
  baseClient: TClient,
  tenantId: string,
): TenantScopedClient<TClient> {
  const cacheKey = `${tenantId}:${baseClient.constructor.name}`;

  if (tenantClientCache.has(cacheKey)) {
    return tenantClientCache.get(cacheKey) as TenantScopedClient<TClient>;
  }

  const scoped = baseClient.$extends({
    query: {
      $allModels: {
        async findMany({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async findFirst({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async findUnique({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async count({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async update({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async updateMany({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async delete({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async deleteMany({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          args.where = withTenantWhere(args.where, tenantId);
          return query(args);
        },
        async create({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          if (args.data && typeof args.data === "object") {
            args.data = {
              ...(args.data as Record<string, unknown>),
              [TENANT_ID_FIELD]: tenantId,
            };
          }

          return query(args);
        },
        async createMany({ args, query }: { args: { where?: unknown; data?: unknown }; query: (args: unknown) => Promise<unknown> }) {
          if (Array.isArray(args.data)) {
            args.data = args.data.map((item) => ({
              ...(item as Record<string, unknown>),
              [TENANT_ID_FIELD]: tenantId,
            }));
          }

          return query(args);
        },
      },
    },
  }) as unknown as TenantScopedClient<TClient>;

  Object.assign(scoped, { tenantId });
  tenantClientCache.set(cacheKey, scoped);
  return scoped;
}

export function getTenantClient<TClient extends PrismaClientLike>(
  baseClient: TClient,
  tenantId: string,
): TenantScopedClient<TClient> {
  return createTenantClient(baseClient, tenantId);
}

export function clearTenantClientCache(): void {
  tenantClientCache.clear();
}

function withTenantWhere(where: unknown, tenantId: string): Record<string, unknown> {
  const base =
    where && typeof where === "object" ? (where as Record<string, unknown>) : {};

  return {
    ...base,
    [TENANT_ID_FIELD]: tenantId,
  };
}
