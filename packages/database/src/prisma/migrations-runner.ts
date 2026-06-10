import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";

export type MigrationRunnerOptions = {
  cwd?: string;
  envPath?: string;
  schemaPath?: string;
  deploy?: boolean;
  generate?: boolean;
};

export type MigrationRunnerResult = {
  deployed: boolean;
  generated: boolean;
  cwd: string;
  schemaPath: string;
};

export async function runMigrations(
  options: MigrationRunnerOptions = {},
): Promise<MigrationRunnerResult> {
  const cwd = options.cwd ?? process.cwd();
  const schemaPath = options.schemaPath ?? resolve(cwd, "prisma/schema.prisma");

  if (options.envPath) {
    loadDotenv({ path: options.envPath });
  } else {
    loadDotenv();
  }

  const deploy = options.deploy !== false;
  const generate = options.generate !== false;

  if (deploy) {
    execSync(`npx prisma migrate deploy --schema "${schemaPath}"`, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });
  }

  if (generate) {
    execSync(`npx prisma generate --schema "${schemaPath}"`, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });
  }

  return {
    deployed: deploy,
    generated: generate,
    cwd,
    schemaPath,
  };
}

export function runMigrationsSync(options: MigrationRunnerOptions = {}): MigrationRunnerResult {
  const cwd = options.cwd ?? process.cwd();
  const schemaPath = options.schemaPath ?? resolve(cwd, "prisma/schema.prisma");

  if (options.envPath) {
    loadDotenv({ path: options.envPath });
  } else {
    loadDotenv();
  }

  const deploy = options.deploy !== false;
  const generate = options.generate !== false;

  if (deploy) {
    execSync(`npx prisma migrate deploy --schema "${schemaPath}"`, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });
  }

  if (generate) {
    execSync(`npx prisma generate --schema "${schemaPath}"`, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });
  }

  return {
    deployed: deploy,
    generated: generate,
    cwd,
    schemaPath,
  };
}
