#!/usr/bin/env node
/**
 * Run Prisma migrate deploy for services in the local Docker stack.
 * Uses repo-root compose files (docker-compose.dev.yml by default).
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../../..");
const require = createRequire(import.meta.url);
const composeFile =
  process.env.COMPOSE_FILE || join(repoRoot, "docker-compose.dev.yml");
const isDev = composeFile.includes("dev");
const postgresService = isDev ? "db" : "postgres";

/** Compose service name -> repo folder under services/ (when they differ). */
const SERVICE_DIR_OVERRIDES = {
  "core-service": "auth-service",
  "ai-service": "ai",
  "ai-training-service": "ai-training",
  "ai-monitoring-service": "ai-monitoring",
  "ai-deploy-service": "ai-deploy",
  "feature-flags-service": "feature-flags",
  "ai-gateway-service": "ai-gateway",
  "ai-cost-service": "ai-cost",
  "ai-security-service": "ai-security",
  "ai-observability-service": "ai-observability",
  "ai-agents-service": "ai-agents",
  "audit-service": "audit",
  "file-storage-service": "file-storage",
  "notification-provider-service": "notification-provider",
  "search-index-service": "search-index",
};

const FULL_PRISMA_SERVICES = [
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
  "ai-service",
  "ai-training-service",
  "ai-monitoring-service",
  "ai-deploy-service",
  "feature-flags-service",
  "ai-gateway-service",
  "ai-cost-service",
  "ai-security-service",
  "ai-observability-service",
  "ai-agents-service",
  "marketplace-service",
  "enterprise-service",
  "organization-service",
  "terminal-service",
  "user-role-service",
  "staff-service",
  "audit-service",
  "file-storage-service",
  "notification-provider-service",
  "search-index-service",
];

const DEV_PRISMA_SERVICES = ["core-service"];

const DEV_SEED_SERVICES = [
  "core-service",
  "tenant-service",
  "patient-service",
  "organization-service",
  "user-role-service",
  "staff-service",
  "notes-service",
  "billing-service",
];

const FULL_SEED_SERVICES = [
  "auth-service",
  "tenant-service",
  "patient-service",
  "organization-service",
  "user-role-service",
  "staff-service",
  "notes-service",
  "billing-service",
];

const DEV_DATABASES = [
  "ordella_auth",
  "ordella_tenant",
  "ordella_patient",
  "ordella_appointment",
  "ordella_billing",
  "ordella_notes",
  "ordella_staff",
  "ordella_user_role",
  "ordella_organization",
  "ordella_pharmacy",
  "ordella_marketplace",
  "ordella_enterprise",
  "ordella_notification",
  "ordella_notification_provider",
  "ordella_reporting",
  "ordella_audit",
  "ordella_terminal",
  "ordella_messaging",
];

const PRISMA_SERVICES = isDev ? DEV_PRISMA_SERVICES : FULL_PRISMA_SERVICES;
const SEED_SERVICES = isDev ? DEV_SEED_SERVICES : FULL_SEED_SERVICES;
const skipSeed = process.argv.includes("--skip-seed");
const skipMigrate = process.argv.includes("--skip-migrate");

const SEED_DATABASES = {
  "core-service": "ordella_auth",
  "auth-service": "ordella_auth",
  "tenant-service": "ordella_tenant",
  "patient-service": "ordella_patient",
  "organization-service": "ordella_organization",
  "user-role-service": "ordella_user_role",
  "staff-service": "ordella_staff",
  "notes-service": "ordella_notes",
  "billing-service": "ordella_billing",
};

const DEV_DB_HOST = process.env.ORDELLA_DEV_DB_HOST ?? "localhost";
const DEV_DB_PORT = process.env.ORDELLA_DEV_DB_PORT ?? process.env.POSTGRES_HOST_PORT ?? "5433";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: options.silent ? "pipe" : "inherit",
    shell: options.shell ?? false,
    encoding: "utf8",
    ...options,
  });
  return {
    code: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function pnpmInService(service, ...commandArgs) {
  if (service === "core-service") {
    return ["pnpm", "--filter", "@ordella/auth-service", ...commandArgs];
  }
  return ["pnpm", ...commandArgs];
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

function resolveServiceDir(service) {
  return SERVICE_DIR_OVERRIDES[service] ?? service;
}

function packageNameForService(service) {
  const dir = resolveServiceDir(service);
  return require(join(repoRoot, "services", dir, "package.json")).name;
}

function hostDatabaseUrl(database) {
  return `postgresql://physio:physio@${DEV_DB_HOST}:${DEV_DB_PORT}/${database}?schema=public`;
}

function listMigrationNames(service) {
  const migrationsDir = join(
    repoRoot,
    "services",
    resolveServiceDir(service),
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

const ENSURE_DATABASES = [
  "ordella_auth",
  "ordella_tenant",
  "ordella_patient",
  "ordella_ai",
  "ordella_ai_training",
  "ordella_ai_monitoring",
  "ordella_ai_deploy",
  "ordella_feature_flags",
  "ordella_ai_gateway",
  "ordella_ai_cost",
  "ordella_ai_security",
  "ordella_ai_observability",
  "ordella_ai_agents",
  "ordella_audit",
  "ordella_file_storage",
  "ordella_notification_provider",
  "ordella_search_index",
  "ordella_subscription_billing",
];

function ensureDatabasesExist() {
  const databases = isDev
    ? [...new Set([...DEV_DATABASES, ...ENSURE_DATABASES])]
    : ENSURE_DATABASES;

  for (const database of databases) {
    const result = run(
      "docker",
      [
        "compose",
        "-f",
        composeFile,
        "exec",
        "-T",
        postgresService,
        "psql",
        "-U",
        "physio",
        "-d",
        "postgres",
        "-c",
        `CREATE DATABASE ${database}`,
      ],
      { silent: true },
    );

    if (result.code === 0) {
      console.log(`  ensured database ${database}`);
    }
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
    postgresService,
  ]);

  if (code !== 0) {
    console.log(`\nStarting ${postgresService}...`);
    const up = run("docker", [
      "compose",
      "-f",
      composeFile,
      "up",
      "-d",
      postgresService,
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
    postgresService,
    "pg_isready",
    "-U",
    "physio",
  ]).code;
}

function dbPush(service) {
  return runInService(
    service,
    pnpmInService(service, "exec", "prisma", "db", "push", "--skip-generate", "--accept-data-loss"),
  ).code;
}

function migrateService(service) {
  const migrationNames = listMigrationNames(service);

  if (migrationNames.length === 0) {
    console.log(
      `  no migration files — syncing schema with db push (local dev)...`,
    );
    return dbPush(service);
  }

  let result = runInService(service, pnpmInService(service, "run", "prisma:deploy"));
  if (result.code === 0) {
    return 0;
  }

  console.log(
    `  migrate deploy failed for ${service} — baselining local schema (P3005) and retrying...`,
  );

  for (const migrationName of migrationNames) {
    runInService(
      service,
      pnpmInService(service, "exec", "prisma", "migrate", "resolve", "--applied", migrationName),
    );
  }

  result = runInService(service, pnpmInService(service, "run", "prisma:deploy"));
  if (result.code === 0) {
    return 0;
  }

  console.log(
    `  migrate deploy still failed for ${service} — applying schema with db push (local dev only)...`,
  );
  return dbPush(service);
}

function hasSeedScript(service) {
  const seedPath = join(
    repoRoot,
    "services",
    resolveServiceDir(service),
    "prisma",
    "seed.ts",
  );
  return existsSync(seedPath);
}

function seedService(service) {
  if (!hasSeedScript(service)) {
    console.log(`  no prisma/seed.ts — skip`);
    return 0;
  }

  const database = SEED_DATABASES[service];
  if (!database) {
    console.log(`  no local database mapping — skip`);
    return 0;
  }

  const packageName = packageNameForService(service);
  console.log(`  running prisma db seed from host (${packageName})...`);

  return run(
    "pnpm",
    ["--filter", packageName, "exec", "prisma", "db", "seed"],
    {
      shell: process.platform === "win32",
      env: {
        ...process.env,
        DATABASE_URL: hostDatabaseUrl(database),
      },
    },
  ).code;
}

if (ensurePostgresRunning() !== 0) {
  console.error("Postgres is not available. Start the dev stack first:");
  console.error("  docker compose -f docker-compose.dev.yml up -d");
  process.exit(1);
}

console.log("\nEnsuring databases exist...");
ensureDatabasesExist();

let failed = 0;

if (!skipMigrate) {
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
} else {
  console.log("\nSkipping migrations (--skip-migrate).");
}

if (skipSeed) {
  console.log("\nSkipping demo seeds (--skip-seed).");
  process.exit(0);
}

console.log("\n--- Seeding demo data (idempotent) ---");
console.log(
  `Using Postgres at ${DEV_DB_HOST}:${DEV_DB_PORT} — ensure the dev stack db container is up.`,
);

let seedFailed = 0;

for (const service of SEED_SERVICES) {
  console.log(`\n--- Seeding ${service} ---`);
  const code = seedService(service);
  if (code !== 0) {
    console.error(`Seed failed for ${service} (exit ${code})`);
    seedFailed += 1;
  }
}

if (seedFailed > 0) {
  console.error(
    `\n${seedFailed} service seed(s) failed. Ensure the stack is up and images are built.`,
  );
  process.exit(1);
}

console.log("\nDemo seeds completed.");
