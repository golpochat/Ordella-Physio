export type TestConfig = {
  nodeEnv: string;
  databaseUrl: string;
  redisUrl: string;
  natsUrl: string;
  jwtSecret: string;
  serviceName: string;
};

export type MockConfigOptions = {
  serviceName?: string;
  databaseUrl?: string;
  redisUrl?: string;
  natsUrl?: string;
  jwtSecret?: string;
};

export function createTestConfig(options: MockConfigOptions = {}): TestConfig {
  return {
    nodeEnv: "test",
    databaseUrl: options.databaseUrl ?? "file:./test.db",
    redisUrl: options.redisUrl ?? "redis://localhost:6379/15",
    natsUrl: options.natsUrl ?? "nats://localhost:4222",
    jwtSecret: options.jwtSecret ?? "test-jwt-secret",
    serviceName: options.serviceName ?? "test-service",
  };
}

export function applyTestConfig(config: TestConfig): () => void {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    NATS_URL: process.env.NATS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SERVICE_NAME: process.env.SERVICE_NAME,
  };

  process.env.NODE_ENV = config.nodeEnv;
  process.env.DATABASE_URL = config.databaseUrl;
  process.env.REDIS_URL = config.redisUrl;
  process.env.NATS_URL = config.natsUrl;
  process.env.JWT_SECRET = config.jwtSecret;
  process.env.SERVICE_NAME = config.serviceName;

  return () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  };
}
