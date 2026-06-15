import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";

const scriptDir = dirname(fileURLToPath(import.meta.url));
export const backendRoot = resolve(scriptDir, "..", "..");

const envPath = resolve(backendRoot, ".env");
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

export function loadBackupEnv() {
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

export function requireBackupEnv() {
  loadBackupEnv();

  const databaseUrl = process.env.DATABASE_URL;
  const encryptionKey = process.env.BACKUP_ENCRYPTION_KEY;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  if (!encryptionKey || encryptionKey.length < 32) {
    throw new Error("BACKUP_ENCRYPTION_KEY (min 32 chars) is required");
  }

  return {
    databaseUrl,
    encryptionKey,
    outputDir: process.env.BACKUP_OUTPUT_DIR ?? resolve(backendRoot, "backups"),
    retentionDays: Number(process.env.BACKUP_RETENTION_DAYS ?? 30),
  };
}

export function withDatabaseName(databaseUrl, databaseName) {
  const url = new URL(databaseUrl);
  url.pathname = `/${databaseName}`;
  return url.toString();
}

export function adminDatabaseUrl(databaseUrl) {
  return withDatabaseName(databaseUrl, "postgres");
}

export function sanitizeDatabaseName(name) {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error(`Unsafe database name: ${name}`);
  }

  return name;
}
