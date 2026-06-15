#!/usr/bin/env node
/**
 * Creates an encrypted PostgreSQL backup (custom format) using pg_dump + openssl.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

import { backendRoot, requireBackupEnv } from "./lib/backup-env.mjs";
import { resolveBackupRuntime, runPgDump } from "./lib/pg-tools.mjs";

function pruneOldBackups(outputDir, retentionDays) {
  const cutoffMs = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  const files = readdirSync(outputDir).filter((name) => name.startsWith("clinic-backend-") && name.endsWith(".dump.enc"));

  for (const fileName of files) {
    const filePath = join(outputDir, fileName);
    const stats = statSync(filePath);
    if (stats.mtimeMs < cutoffMs) {
      unlinkSync(filePath);
      console.log(`[backup] pruned ${fileName}`);
    }
  }
}

function main() {
  const { databaseUrl, encryptionKey, outputDir, retentionDays } = requireBackupEnv();
  const runtime = resolveBackupRuntime();
  mkdirSync(outputDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dumpFile = join(outputDir, `clinic-backend-${timestamp}.dump`);
  const encFile = `${dumpFile}.enc`;

  console.log(`[backup] dumping database via ${runtime.mode}`);
  runPgDump({ databaseUrl, outputFile: dumpFile, runtime });

  console.log("[backup] encrypting backup");
  execFileSync(
    "openssl",
    ["enc", "-aes-256-cbc", "-salt", "-pbkdf2", "-in", dumpFile, "-out", encFile, "-pass", "env:BACKUP_ENCRYPTION_KEY"],
    {
      cwd: backendRoot,
      stdio: "inherit",
      env: { ...process.env, BACKUP_ENCRYPTION_KEY: encryptionKey },
    },
  );

  unlinkSync(dumpFile);
  pruneOldBackups(outputDir, retentionDays);
  console.log(`[backup] encrypted backup written to ${encFile}`);
}

main();
