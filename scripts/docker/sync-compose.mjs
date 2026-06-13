#!/usr/bin/env node
/**
 * Regenerates root docker-compose.yml and docker-compose.dev.yml
 * from infrastructure/deployment-layer templates.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const PROJECT = "ordella-physio";
const NETWORK = `${PROJECT}-network`;

/** Map dockerfile path → service-local build context */
function buildContextFromDockerfile(dockerfile) {
  const match = dockerfile.match(/^(services|apps)\/([^/]+)\/Dockerfile$/);
  if (!match) return null;
  return `./${match[1]}/${match[2]}`;
}

/**
 * Replace legacy root-context build blocks with service-local context + production target.
 */
function normalizeBuildBlocks(content) {
  const lines = content.split(/\r?\n/);
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "build:") {
      result.push(line);
      i++;

      let contextLine = null;
      let dockerfileLine = null;
      let argsBlock = [];
      let inArgs = false;

      while (i < lines.length) {
        const current = lines[i];
        const trimmed = current.trim();

        if (/^context:/.test(trimmed)) {
          contextLine = current;
          i++;
          continue;
        }
        if (/^dockerfile:/.test(trimmed)) {
          dockerfileLine = current;
          i++;
          continue;
        }
        if (trimmed === "args:") {
          inArgs = true;
          argsBlock.push(current);
          i++;
          continue;
        }
        if (inArgs) {
          if (/^[^\s]/.test(current) || /^    [a-z]/i.test(current) && !/^      /.test(current)) {
            inArgs = false;
            break;
          }
          argsBlock.push(current);
          i++;
          continue;
        }
        break;
      }

      const dockerfileMatch = dockerfileLine?.match(/dockerfile:\s*(.+)/);
      const dockerfile = dockerfileMatch?.[1]?.trim() ?? "";
      const ctx = buildContextFromDockerfile(dockerfile);

      if (ctx) {
        result.push(`      context: ${ctx}`);
        result.push("      dockerfile: Dockerfile");
        result.push("      target: production");
        result.push("      additional_contexts:");
        result.push("        workspace: .");
        for (const argLine of argsBlock) {
          result.push(argLine);
        }
      } else if (contextLine && dockerfileLine) {
        result.push(contextLine);
        result.push(dockerfileLine);
        for (const argLine of argsBlock) {
          result.push(argLine);
        }
      }
      continue;
    }

    result.push(line);
    i++;
  }

  return result.join("\n");
}

function processFullCompose(source) {
  let out = source
    .replace(/^version:\s*["']?3\.9["']?\s*\n/m, "")
    .replace(
      /^# Ordella Physio — .+\n(?:# Usage: .+\n)?/m,
      `# Ordella Physio — full local stack\n# Usage: docker compose up -d\n# Lightweight dev: docker compose -f docker-compose.dev.yml up -d\n`,
    )
    .replace(/ordella-network:/g, `${NETWORK}:`)
    .replace(/name: ordella-network/g, `name: ${NETWORK}`)
    .replace(/- ordella-network/g, `- ${NETWORK}`)
    .replace(/container_name: ordella_local_([a-z0-9_]+)/g, (_, slug) => {
      const name = slug.replace(/_/g, "-");
      return `container_name: ${PROJECT}-${name}`;
    })
    .replace(
      /\.\/postgres\/init-databases\.sql/g,
      "./infrastructure/deployment-layer/postgres/init-databases.sql",
    )
    .replace(
      /(\s+env_file:\n\s+- )\.env\.local/g,
      "$1infrastructure/deployment-layer/.env.local",
    )
    .replace(/image: postgres:15$/m, "image: postgres:15-alpine")
    .replace(/image: redis:7$/m, "image: redis:7-alpine")
    .replace(/image: ordella-physio-[^:]+:dev/g, (m) => m.replace(":dev", ":latest"));

  out = normalizeBuildBlocks(out);

  const volumeNames = [
    "postgres_data",
    "redis_data",
    "nats_data",
    "loki_data",
    "prometheus_data",
    "grafana_data",
    "tempo_data",
  ];

  for (const vol of volumeNames) {
    out = out.replace(new RegExp(`^  ${vol}:$`, "gm"), `  ${PROJECT}-${vol}:`);
    out = out.replace(new RegExp(`- ${vol}:`, "g"), `- ${PROJECT}-${vol}:`);
  }

  const lines = out.split(/\r?\n/);
  const result = [];
  let currentService = null;
  let inBuild = false;
  let hasImage = false;

  for (const line of lines) {
    const serviceMatch = line.match(/^  ([a-z0-9-]+):$/);
    if (serviceMatch) {
      currentService = serviceMatch[1];
      inBuild = false;
      hasImage = false;
    }

    if (line.trim() === "build:") {
      inBuild = true;
      hasImage = false;
    }

    if (inBuild && line.trim().startsWith("image:")) {
      hasImage = true;
    }

    if (inBuild && !hasImage && /^    container_name:/.test(line) && currentService) {
      result.push(`    image: ${PROJECT}-${currentService}:latest`);
      hasImage = true;
      inBuild = false;
    }

    result.push(line);
  }

  return result.join("\n");
}

const fullSource = readFileSync(
  join(ROOT, "infrastructure/deployment-layer/docker-compose.full.yml"),
  "utf8",
);

writeFileSync(join(ROOT, "docker-compose.yml"), processFullCompose(fullSource), "utf8");
console.log("wrote docker-compose.yml");

const devSource = readFileSync(
  join(ROOT, "infrastructure/deployment-layer/docker-compose.dev.template.yml"),
  "utf8",
);

writeFileSync(
  join(ROOT, "docker-compose.dev.yml"),
  processFullCompose(devSource),
  "utf8",
);
console.log("wrote docker-compose.dev.yml");
