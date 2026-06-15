import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function commandExists(command: string): boolean {
  try {
    if (process.platform === "win32") {
      execFileSync("where", [command], { stdio: "ignore" });
    } else {
      execFileSync("which", [command], { stdio: "ignore" });
    }
    return true;
  } catch {
    return false;
  }
}

function dockerDbRunning(): boolean {
  try {
    const output = execFileSync(
      "docker",
      ["inspect", "-f", "{{.State.Running}}", process.env.BACKUP_DOCKER_CONTAINER ?? "ordella-clinic-backend-db"],
      { encoding: "utf8" },
    ).trim();
    return output === "true";
  } catch {
    return false;
  }
}

function canRunBackupDrill(): boolean {
  const envPath = resolve(backendRoot, ".env");
  if (!existsSync(envPath)) {
    return false;
  }

  if (!commandExists("openssl")) {
    return false;
  }

  const hasPgTools =
    commandExists("pg_dump") && commandExists("pg_restore") && commandExists("psql");
  return hasPgTools || dockerDbRunning();
}

describe("backup restore drill", () => {
  it("creates an encrypted backup and restores it into a temporary database", (ctx) => {
    if (!canRunBackupDrill()) {
      return ctx.skip();
    }

    execFileSync("node", ["scripts/backup-restore-drill.mjs"], {
      cwd: backendRoot,
      stdio: "inherit",
    });

    expect(true).toBe(true);
  });
});
