process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://physio:physio@localhost:5433/ordella_test?schema=public";
process.env.PORT = process.env.PORT ?? "3000";
process.env.NATS_URL = process.env.NATS_URL ?? "nats://localhost:4222";
