export type CacheSetOptions = {
  ttlSeconds?: number;
};

export interface CacheClient {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheSetOptions): Promise<void>;
  del(key: string): Promise<void>;
  invalidateByPrefix(prefix: string): Promise<void>;
  disconnect(): Promise<void>;
}
