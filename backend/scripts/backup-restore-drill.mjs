#!/usr/bin/env node
/**
 * Disaster-recovery drill:
 * 1. Create encrypted backup
 * 2. Restore into a temporary database
 * 3. Verify core tables are readable
 * 4. Drop temporary database and remove drill backup
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

import {
  adminDatabaseUrl,
  backendRoot,
  requireBackupEnv,
  sanitizeDatabaseName,
  withDatabaseName,
} from "./lib/backup-env.mjs";
import { resolveBackupRuntime, runPsqlCommand } from "./lib/pg-tools.mjs";

function latestBackupFile(outputDir) {
  const files = readdirSync(outputDir)
    .filter((name) => name.startsWith("clinic-backend-") && name.endsWith(".dump.enc"))
    .map((name) => ({
      name,
      path: join(outputDir, name),
      mtimeMs: statSync(join(outputDir, name)).mtimeMs,
    }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  return files[0] ?? null;
}

function main() {
  const { databaseUrl, encryptionKey, outputDir } = requireBackupEnv();
  const runtime = resolveBackupRuntime();
  mkdirSync(outputDir, { recursive: true });

  const drillDbName = sanitizeDatabaseName(`clinic_backend_drill_${Date.now()}`);
  const adminUrl = adminDatabaseUrl(databaseUrl);
  const drillDatabaseUrl = withDatabaseName(databaseUrl, drillDbName);

  console.log("[drill] creating backup");
  execFileSync("node", ["scripts/backup-database.mjs"], {
    cwd: backendRoot,
    stdio: "inherit",
    env: { ...process.env, BACKUP_ENCRYPTION_KEY: encryptionKey },
  });

  const backup = latestBackupFile(outputDir);
  if (!backup) {
    throw new Error("Backup file was not created");
  }

  console.log(`[drill] using backup ${backup.name}`);
  console.log(`[drill] creating temporary database ${drillDbName}`);
  runPsqlCommand({ databaseUrl: adminUrl, sql: `CREATE DATABASE ${drillDbName}`, runtime });

  try {
    execFileSync("node", ["scripts/restore-database.mjs", backup.path], {
      cwd: backendRoot,
      stdio: "inherit",
      env: {
        ...process.env,
        BACKUP_ENCRYPTION_KEY: encryptionKey,
        RESTORE_TARGET_DATABASE_URL: drillDatabaseUrl,
      },
    });

    const tenantCount = runPsqlCommand({
      databaseUrl: drillDatabaseUrl,
      sql: "SELECT COUNT(*) FROM tenants",
      runtime,
      scalar: true,
    });
    const migrationCount = runPsqlCommand({
      databaseUrl: drillDatabaseUrl,
      sql: "SELECT COUNT(*) FROM _prisma_migrations",
      runtime,
      scalar: true,
    });

    console.log(`[drill] verified tenants=${tenantCount}, migrations=${migrationCount}`);

    if (Number(migrationCount) < 1) {
      throw new Error("Restore verification failed: _prisma_migrations is empty");
    }
  } finally {
    const exists = runPsqlCommand({
      databaseUrl: adminUrl,
      sql: `SELECT 1 FROM pg_database WHERE datname='${drillDbName}'`,
      runtime,
      scalar: true,
    });

    if (exists === "1") {
      console.log(`[drill] dropping temporary database ${drillDbName}`);
      runPsqlCommand({
        databaseUrl: adminUrl,
        sql: `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${drillDbName}' AND pid <> pg_backend_pid();`,
        runtime,
      });
      runPsqlCommand({ databaseUrl: adminUrl, sql: `DROP DATABASE ${drillDbName}`, runtime });
    }

    if (existsSync(backup.path)) {
      unlinkSync(backup.path);
      console.log(`[drill] removed drill backup ${backup.name}`);
    }
  }

  console.log("[drill] backup + restore verification succeeded");
}

main();
