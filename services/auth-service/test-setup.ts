process.env.NODE_ENV = "test";
process.env.PORT = process.env.PORT ?? "3051";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? "postgresql://ordella:ordella@localhost:5432/ordella_auth";
process.env.NATS_URL = process.env.NATS_URL ?? "nats://localhost:4222";
process.env.REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "15m";
process.env.REFRESH_TOKEN_EXPIRES_IN =
  process.env.REFRESH_TOKEN_EXPIRES_IN ?? "7d";
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
process.env.API_GATEWAY_URL = process.env.API_GATEWAY_URL ?? "http://localhost:3049";
process.env.GATEWAY_PROBE_TIMEOUT_MS = process.env.GATEWAY_PROBE_TIMEOUT_MS ?? "1500";
jest.setTimeout(20000);
