#!/usr/bin/env node
/**
 * Regenerate all Docker artifacts: Dockerfiles, .dockerignore, compose files.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const scripts = [
  "scripts/docker/sync-dockerfiles.mjs",
  "scripts/docker/sync-dockerignore.mjs",
  "scripts/docker/sync-compose.mjs",
];

for (const script of scripts) {
  console.log(`\n>>> node ${script}`);
  const result = spawnSync("node", [join(ROOT, script)], { stdio: "inherit", cwd: ROOT });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("\nAll Docker artifacts regenerated.");
