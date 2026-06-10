import { createInMemoryTestDb } from "../utils/test-db";
import { createMockNatsClient } from "../utils/test-nats";
import { createMockRedisClient } from "../utils/test-redis";
import { applyTestConfig, createTestConfig, type TestConfig } from "./mock-config";
import { loadTestEnv } from "./mock-env";

export type TestFramework = "jest" | "vitest";

export type TestLifecycleHooks = {
  beforeAll: (callback: () => void | Promise<void>) => void;
  afterAll: (callback: () => void | Promise<void>) => void;
  beforeEach: (callback: () => void | Promise<void>) => void;
  afterEach: (callback: () => void | Promise<void>) => void;
};

export type TestEnvironmentOptions = {
  framework?: TestFramework;
  hooks?: TestLifecycleHooks;
  config?: Partial<TestConfig>;
  envFile?: string;
};

type GlobalScope = typeof globalThis & Partial<TestLifecycleHooks>;

function resolveHooks(hooks?: TestLifecycleHooks): TestLifecycleHooks {
  if (hooks) {
    return hooks;
  }

  const globalScope = globalThis as GlobalScope;
  if (
    globalScope.beforeAll &&
    globalScope.afterAll &&
    globalScope.beforeEach &&
    globalScope.afterEach
  ) {
    return {
      beforeAll: (callback) => globalScope.beforeAll!(callback),
      afterAll: (callback) => globalScope.afterAll!(callback),
      beforeEach: (callback) => globalScope.beforeEach!(callback),
      afterEach: (callback) => globalScope.afterEach!(callback),
    };
  }

  throw new Error(
    "Test lifecycle hooks not found. Pass hooks explicitly to setupTestEnvironment().",
  );
}

export type TestEnvironmentContext = {
  config: TestConfig;
  db: ReturnType<typeof createInMemoryTestDb>;
  nats: ReturnType<typeof createMockNatsClient>;
  redis: ReturnType<typeof createMockRedisClient>;
};

export function setupTestEnvironment(options: TestEnvironmentOptions = {}): TestEnvironmentContext {
  const hooks = resolveHooks(options.hooks);
  const config = createTestConfig(options.config);
  const db = createInMemoryTestDb();
  const nats = createMockNatsClient();
  const redis = createMockRedisClient();

  let restoreConfig: (() => void) | undefined;

  hooks.beforeAll(async () => {
    loadTestEnv({ envFile: options.envFile ?? ".env.test" });
    restoreConfig = applyTestConfig(config);
  });

  hooks.afterAll(async () => {
    restoreConfig?.();
    await db.reset();
    nats.clear();
    redis.clear();
  });

  hooks.beforeEach(async () => {
    await db.reset();
    nats.clear();
    redis.clear();
  });

  hooks.afterEach(async () => {
    await db.reset();
    nats.clear();
    redis.clear();
  });

  return { config, db, nats, redis };
}
