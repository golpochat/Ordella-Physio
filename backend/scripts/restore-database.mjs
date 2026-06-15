#!/usr/bin/env node
/**
 * Restores an encrypted clinic-backend backup into the target DATABASE_URL.
 *
 * Usage:
 *   node scripts/restore-database.mjs path/to/clinic-backend-*.dump.enc
 */
import { execFileSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { basename, join } from "node:path";

import { backendRoot, requireBackupEnv } from "./lib/backup-env.mjs";
import { resolveBackupRuntime, runPgRestore } from "./lib/pg-tools.mjs";

function main() {
  const backupPath = process.argv[2];
  if (!backupPath) {
    console.error("Usage: node scripts/restore-database.mjs <backup-file.dump.enc>");
    process.exit(1);
  }

  if (!existsSync(backupPath)) {
    console.error(`Backup file not found: ${backupPath}`);
    process.exit(1);
  }

  const { encryptionKey } = requireBackupEnv();
  const targetDatabaseUrl = process.env.RESTORE_TARGET_DATABASE_URL ?? process.env.DATABASE_URL;
  const runtime = resolveBackupRuntime();

  if (!targetDatabaseUrl) {
    console.error("RESTORE_TARGET_DATABASE_URL or DATABASE_URL is required");
    process.exit(1);
  }

  const plainDump = join(backendRoot, "backups", `.restore-${basename(backupPath).replace(/\.enc$/, "")}`);

  console.log(`[restore] decrypting ${backupPath}`);
  execFileSync(
    "openssl",
    ["enc", "-d", "-aes-256-cbc", "-pbkdf2", "-in", backupPath, "-out", plainDump, "-pass", "env:BACKUP_ENCRYPTION_KEY"],
    {
      cwd: backendRoot,
      stdio: "inherit",
      env: { ...process.env, BACKUP_ENCRYPTION_KEY: encryptionKey },
    },
  );

  console.log(`[restore] restoring into target database via ${runtime.mode}`);
  runPgRestore({ databaseUrl: targetDatabaseUrl, dumpFile: plainDump, runtime });

  unlinkSync(plainDump);
  console.log("[restore] complete");
}

main();
