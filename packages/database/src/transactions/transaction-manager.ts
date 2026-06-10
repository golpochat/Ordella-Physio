import { AsyncLocalStorage } from "node:async_hooks";
import type { PrismaClientLike } from "../prisma/client";
import { getTenantClient } from "../prisma/tenant-client";
import { DB_ERROR_CODES } from "../constants/db-errors";
import { normalizeDbError } from "../utils/normalize-error";

export type TransactionContext = {
  client: PrismaClientLike;
  tenantId?: string;
  isNested: boolean;
};

const transactionStorage = new AsyncLocalStorage<TransactionContext>();

export class TransactionManager {
  constructor(private readonly getClient: () => Promise<PrismaClientLike>) {}

  async runInTransaction<T>(
    callback: (context: TransactionContext) => Promise<T>,
    tenantId?: string,
  ): Promise<T> {
    const existing = transactionStorage.getStore();

    if (existing) {
      return callback({ ...existing, isNested: true });
    }

    const client = await this.getClient();

    try {
      const runTransaction = client.$transaction as unknown as <TResult>(
        fn: (tx: PrismaClientLike) => Promise<TResult>,
      ) => Promise<TResult>;

      return await runTransaction(async (tx) => {
        const scopedClient = tenantId
          ? getTenantClient(tx as unknown as PrismaClientLike, tenantId)
          : (tx as unknown as PrismaClientLike);

        const context: TransactionContext = {
          client: scopedClient,
          tenantId,
          isNested: false,
        };

        return transactionStorage.run(context, () => callback(context));
      });
    } catch (error) {
      const normalized = normalizeDbError(error);
      throw Object.assign(new Error(normalized.message), {
        code: DB_ERROR_CODES.TRANSACTION_FAILED,
        cause: normalized,
      });
    }
  }

  getContext(): TransactionContext | undefined {
    return transactionStorage.getStore();
  }

  getClientFromContext(fallback: PrismaClientLike): PrismaClientLike {
    return transactionStorage.getStore()?.client ?? fallback;
  }
}

let defaultTransactionManager: TransactionManager | undefined;

export function createTransactionManager(
  getClient: () => Promise<PrismaClientLike>,
): TransactionManager {
  return new TransactionManager(getClient);
}

export function getTransactionContext(): TransactionContext | undefined {
  return transactionStorage.getStore();
}

export function setDefaultTransactionManager(manager: TransactionManager): void {
  defaultTransactionManager = manager;
}

export function getDefaultTransactionManager(): TransactionManager {
  if (!defaultTransactionManager) {
    throw new Error("Default transaction manager is not configured");
  }

  return defaultTransactionManager;
}
