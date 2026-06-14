import type { PrismaLikeClient } from "../utils/test-db";

export type PrismaTestClientOptions<T extends PrismaLikeClient> = {
  createClient: () => T;
  tables?: string[];
};

export type PrismaTestClientHandle<T extends PrismaLikeClient> = {
  client: T;
  reset: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export function prismaTestClient<T extends PrismaLikeClient>(
  options: PrismaTestClientOptions<T>,
): PrismaTestClientHandle<T> {
  const client = options.createClient();
  const tables = options.tables ?? [];

  return {
    client,
    async reset() {
      if (client.$executeRawUnsafe && tables.length > 0) {
        for (const table of tables) {
          await client.$executeRawUnsafe(`DELETE FROM "${table}";`);
        }
        return;
      }

      if ("$disconnect" in client) {
        return;
      }
    },
    async disconnect() {
      const disconnectable = client as unknown as { $disconnect?: () => Promise<void> };
      if (typeof disconnectable.$disconnect === "function") {
        await disconnectable.$disconnect();
      }
    },
  };
}
