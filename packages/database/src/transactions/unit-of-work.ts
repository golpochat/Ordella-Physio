import type { PrismaClientLike } from "../prisma/client";
import type { BaseRepository } from "../repositories/base-repository";
import {
  createTransactionManager,
  type TransactionContext,
  type TransactionManager,
} from "./transaction-manager";

export class UnitOfWork {
  private readonly repositories = new Set<BaseRepository<unknown, never, never, never>>();
  private readonly manager: TransactionManager;
  private pendingTenantId: string | undefined;

  constructor(getClient: () => Promise<PrismaClientLike>) {
    this.manager = createTransactionManager(getClient);
  }

  track<TRepository extends BaseRepository<unknown, never, never, never>>(
    repository: TRepository,
  ): TRepository {
    this.repositories.add(repository);
    return repository;
  }

  begin(tenantId?: string): void {
    this.pendingTenantId = tenantId;
  }

  async commit<T>(operation: (context: TransactionContext) => Promise<T>): Promise<T> {
    return this.manager.runInTransaction(async (context) => {
      const result = await operation(context);
      this.pendingTenantId = undefined;
      return result;
    }, this.pendingTenantId);
  }

  rollback(): void {
    this.pendingTenantId = undefined;
    this.repositories.clear();
  }

  getRepositories(): BaseRepository<unknown, never, never, never>[] {
    return [...this.repositories];
  }

  async execute<T>(operation: (context: TransactionContext) => Promise<T>): Promise<T> {
    return this.commit(operation);
  }
}

export function createUnitOfWork(getClient: () => Promise<PrismaClientLike>): UnitOfWork {
  return new UnitOfWork(getClient);
}
