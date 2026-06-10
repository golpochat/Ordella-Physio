import type { TestDbAdapter } from "../fixtures/types";

type StoredRecord = Record<string, unknown> & { id?: string };

export function createInMemoryTestDb(): TestDbAdapter {
  const tables = new Map<string, StoredRecord[]>();

  return {
    async insert<T>(table: string, data: Record<string, unknown>): Promise<T> {
      const records = tables.get(table) ?? [];
      const record = { ...data } as StoredRecord;
      if (!record.id) {
        record.id = `${table}-${records.length + 1}`;
      }
      records.push(record);
      tables.set(table, records);
      return record as T;
    },

    async reset(): Promise<void> {
      tables.clear();
    },

    async seed(
      records: Array<{ table: string; data: Record<string, unknown> }>,
    ): Promise<void> {
      for (const entry of records) {
        await this.insert(entry.table, entry.data);
      }
    },

    async transaction<T>(callback: () => Promise<T>): Promise<T> {
      const snapshot = new Map<string, StoredRecord[]>(
        Array.from(tables.entries()).map(([table, records]) => [table, records.map((record) => ({ ...record }))]),
      );

      try {
        return await callback();
      } catch (error) {
        tables.clear();
        for (const [table, records] of snapshot.entries()) {
          tables.set(table, records);
        }
        throw error;
      }
    },
  };
}

export type PrismaLikeClient = {
  $executeRawUnsafe?: (query: string) => Promise<unknown>;
  $transaction?: <T>(callback: (client: PrismaLikeClient) => Promise<T>) => Promise<T>;
};

export async function resetDatabase(client: PrismaLikeClient, tables: string[]): Promise<void> {
  if (client.$executeRawUnsafe) {
    for (const table of tables) {
      await client.$executeRawUnsafe(`DELETE FROM "${table}";`);
    }
    return;
  }

  throw new Error("Provided database client does not support resetDatabase");
}

export async function seedDatabase(
  db: TestDbAdapter,
  records: Array<{ table: string; data: Record<string, unknown> }>,
): Promise<void> {
  await db.seed(records);
}

export async function withTransaction<T>(
  client: PrismaLikeClient,
  callback: () => Promise<T>,
): Promise<T> {
  if (client.$transaction) {
    return client.$transaction(async () => callback());
  }

  return callback();
}
