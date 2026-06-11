/**
 * Compatibility entrypoint — run migrations from repo root via either:
 *   node infrastructure/scripts/migrate-local-databases.mjs
 *   node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs
 *   pnpm db:migrate:local
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const target = path.resolve(scriptDir, "../deployment-layer/scripts/migrate-local-databases.mjs");

const result = spawnSync(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: "inherit",
  cwd: path.resolve(scriptDir, "../.."),
});

process.exit(result.status ?? 1);
