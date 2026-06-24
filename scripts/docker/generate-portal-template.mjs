#!/usr/bin/env node
/**
 * One-off helper: regenerate portal template from committed docker-compose.dev.yml.
 * Run: node scripts/docker/generate-portal-template.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(
  ROOT,
  "infrastructure/deployment-layer/docker-compose.dev.portal.template.yml",
);

const result = spawnSync(
  "git",
  ["show", "HEAD:docker-compose.dev.yml"],
  { encoding: "utf8", cwd: ROOT },
);

if (result.status !== 0) {
  console.error(result.stderr || "git show failed");
  process.exit(1);
}

const lines = result.stdout.split(/\r?\n/);
const start = lines.findIndex((l) => /^  tenant-service:/.test(l));
const end = lines.findIndex((l) =>
  l.includes("OPTIONAL SERVICES (DISABLED BY DEFAULT)"),
);

if (start < 0 || end < 0) {
  console.error("Could not locate portal service block in HEAD compose");
  process.exit(1);
}

let block = lines.slice(start, end).join("\n");
block = block.replace(/^  ([a-z0-9-]+):$/gm, '  $1:\n    profiles: ["portal"]');
block = block.replace(
  /image: ordella-physio-([^:]+):latest/g,
  "image: ordella-physio-$1:dev",
);

const header = `# Portal microservices — opt-in via --profile portal
# Merged into docker-compose.dev.yml by scripts/docker/sync-compose.mjs
# Regenerate: node scripts/docker/generate-portal-template.mjs

`;

writeFileSync(OUT, header + block + "\n", "utf8");
console.log(`wrote ${OUT}`);
