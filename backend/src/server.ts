import { createApp } from "./app";
import { env } from "./config";
import { connectRedis, disconnectRedis } from "./lib/redis";
import { disconnectPrisma } from "./lib/prisma";
import { purgeExpiredRevokedTokens } from "./modules/security/security-events.service";

void connectRedis().catch((error) => {
  console.warn("Redis connection skipped", error);
});

const app = createApp();

void purgeExpiredRevokedTokens().catch((error) => {
  console.warn("Failed to purge expired revoked tokens", error);
});

const server = app.listen(env.PORT, () => {
  console.log(`Clinic backend listening on http://localhost:${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(async () => {
    await disconnectRedis();
    await disconnectPrisma();
    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
