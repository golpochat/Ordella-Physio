export type TestDbAdapter = {
  insert<T>(table: string, data: Record<string, unknown>): Promise<T>;
  reset(): Promise<void>;
  seed(records: Array<{ table: string; data: Record<string, unknown> }>): Promise<void>;
  transaction<T>(callback: () => Promise<T>): Promise<T>;
};

export type TenantScopedFixtureOptions = {
  tenantId?: string;
  db: TestDbAdapter;
};
