#!/usr/bin/env node
/**
 * Run Prisma migrate deploy for every service in the local Docker stack.
 * Uses docker compose run so migrations always hit ordella_local_postgres (not host Postgres).
 */
import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../../..");
const deployDir = join(__dirname, "..");
const composeFile = "docker-compose.local.yml";

const PRISMA_SERVICES = [
  "auth-service",
  "tenant-service",
  "patient-service",
  "appointment-service",
  "notes-service",
  "billing-service",
  "payment-service",
  "communication-service",
  "reporting-service",
  "messaging-service",
  "notification-service",
  "ai-notes-service",
  "marketplace-service",
  "enterprise-service",
  "organization-service",
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: deployDir,
    stdio: options.silent ? "pipe" : "inherit",
    shell: false,
    encoding: "utf8",
    ...options,
  });
  return {
    code: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function runInService(service, commandArgs) {
  return run("docker", [
    "compose",
    "-f",
    composeFile,
    "run",
    "--rm",
    "--no-deps",
    service,
    ...commandArgs,
  ]);
}

function listMigrationNames(service) {
  const migrationsDir = join(
    repoRoot,
    "services",
    service,
    "prisma",
    "migrations",
  );

  try {
    return readdirSync(migrationsDir).filter((entry) => {
      const fullPath = join(migrationsDir, entry);
      if (!statSync(fullPath).isDirectory()) return false;
      try {
        return statSync(join(fullPath, "migration.sql")).isFile();
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

function ensurePostgresRunning() {
  const { code } = run("docker", [
    "compose",
    "-f",
    composeFile,
    "ps",
    "--status",
    "running",
    "postgres",
  ]);

  if (code !== 0) {
    console.log("\nStarting postgres...");
    const up = run("docker", [
      "compose",
      "-f",
      composeFile,
      "up",
      "-d",
      "postgres",
    ]);
    if (up.code !== 0) return up.code;
  }

  console.log("Waiting for postgres to be healthy...");
  return run("docker", [
    "compose",
    "-f",
    composeFile,
    "exec",
    "-T",
    "postgres",
    "pg_isready",
    "-U",
    "physio",
  ]).code;
}

function dbPush(service) {
  return runInService(service, [
    "pnpm",
    "exec",
    "prisma",
    "db",
    "push",
    "--skip-generate",
    "--accept-data-loss",
  ]).code;
}

function migrateService(service) {
  const migrationNames = listMigrationNames(service);

  if (migrationNames.length === 0) {
    console.log(
      `  no migration files — syncing schema with db push (local dev)...`,
    );
    return dbPush(service);
  }

  let result = runInService(service, ["pnpm", "run", "prisma:deploy"]);
  if (result.code === 0) {
    return 0;
  }

  console.log(
    `  migrate deploy failed for ${service} — baselining local schema (P3005) and retrying...`,
  );

  for (const migrationName of migrationNames) {
    runInService(service, [
      "pnpm",
      "exec",
      "prisma",
      "migrate",
      "resolve",
      "--applied",
      migrationName,
    ]);
  }

  result = runInService(service, ["pnpm", "run", "prisma:deploy"]);
  if (result.code === 0) {
    return 0;
  }

  console.log(
    `  migrate deploy still failed for ${service} — applying schema with db push (local dev only)...`,
  );
  return dbPush(service);
}

if (ensurePostgresRunning() !== 0) {
  console.error("Postgres is not available. Start the stack first:");
  console.error("  cd infrastructure/deployment-layer");
  console.error(`  docker compose -f ${composeFile} up -d`);
  process.exit(1);
}

let failed = 0;

for (const service of PRISMA_SERVICES) {
  console.log(`\n--- Migrating ${service} ---`);
  const code = migrateService(service);
  if (code !== 0) {
    console.error(`Migration failed for ${service} (exit ${code})`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} service(s) failed to migrate.`);
  process.exit(1);
}

console.log("\nAll local database migrations completed.");
