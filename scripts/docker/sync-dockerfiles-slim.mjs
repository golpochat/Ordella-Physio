#!/usr/bin/env node
/**
 * Slim production stages: pnpm deploy (--prod) + dist copy instead of full node_modules.
 * Target: final images < 400 MB per docs/docker-rules.md §3.
 *
 * Run: node scripts/docker/sync-dockerfiles-slim.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const DEPLOY_PRUNE = `  && rm -rf /deploy/src /deploy/test /deploy/coverage /deploy/.turbo \\
  && rm -f /deploy/tsconfig*.json /deploy/jest.config.ts /deploy/nest-cli.json \\
  && rm -f /deploy/test-setup.ts /deploy/.eslintrc.cjs /deploy/.prettierrc \\
  && rm -f /deploy/Dockerfile /deploy/.dockerignore /deploy/README.md /deploy/.env.example`;

function discoverDockerfiles() {
  const files = [];
  for (const name of readdirSync(join(ROOT, "services"))) {
    const dockerfile = join(ROOT, "services", name, "Dockerfile");
    try {
      if (statSync(dockerfile).isFile()) {
        files.push(dockerfile);
      }
    } catch {
      /* skip */
    }
  }
  const backendDockerfile = join(ROOT, "backend", "Dockerfile");
  if (statSync(backendDockerfile).isFile()) {
    files.push(backendDockerfile);
  }
  return files.filter((filePath) => {
    const content = readFileSync(filePath, "utf8");
    return (
      content.includes("ordella-base:latest") &&
      content.includes("COPY --from=build /app/node_modules")
    );
  }).sort();
}

function readStartScript(serviceDir) {
  const pkgPath = join(serviceDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const start = pkg.scripts?.start ?? pkg.scripts?.["start:prod"];
  if (!start?.startsWith("node ")) {
    throw new Error(`Unsupported start script in ${pkgPath}: ${start}`);
  }
  return start.replace(/^node /, "");
}

function parseDockerfile(content, filePath) {
  const filterMatch = content.match(/pnpm install --filter ([^\s]+)/);
  if (!filterMatch) throw new Error(`No pnpm filter in ${filePath}`);
  const pkg = filterMatch[1].replace(/\.\.\.$/, "");

  const serviceCopyMatch = content.match(
    /COPY --from=build \/app\/(services\/[^\s]+|backend)(?: \.\/(?:services\/[^\s]+|backend))?/,
  );
  if (!serviceCopyMatch) throw new Error(`No service COPY path in ${filePath}`);

  const buildServicePath = serviceCopyMatch[1];
  const serviceDir = join(ROOT, buildServicePath);

  const prodMatch = content.match(
    /((?:# -+\n# 3\. PRODUCTION STAGE[^\n]*\n# -+\n)?FROM node:[^\n]+ AS production\n(?:RUN[^\n]+\n)*)/,
  );
  if (!prodMatch) throw new Error(`No production stage in ${filePath}`);

  const productionPrefix = prodMatch[1];

  const cmdMatch = content.match(/CMD (\[[^\]]+\])/);
  if (!cmdMatch) throw new Error(`No CMD in ${filePath}`);

  const entry = readStartScript(serviceDir);
  const startType = SERVICE_START[pkg] ?? "node";
  const slimCmd = slimStartCmd(startType, entry);
  const usesPrisma = startType !== "node";
  const isBookworm = productionPrefix.includes("bookworm-slim");

  return {
    pkg,
    buildServicePath,
    productionPrefix,
    slimCmd,
    usesPrisma,
    isBookworm,
  };
}

const SERVICE_START = {
  "@ordella/auth-service": "migrate",
  "@ordella/tenant-service": "dbpush-loss",
  "@ordella/patient-service": "dbpush",
  "@ordella/appointment-service": "dbpush",
  "@ordella/notes-service": "dbpush",
  "@ordella/billing-service": "migrate",
  "@ordella/payment-service": "dbpush",
  "@ordella/communication-service": "dbpush",
  "@ordella/reporting-service": "dbpush",
  "@ordella/event-bus-service": "node",
  "@ordella/messaging-service": "dbpush",
  "@ordella/notification-service": "dbpush",
  "@ordella/ai-notes-service": "dbpush",
  "@ordella/marketplace-service": "dbpush",
  "@ordella/enterprise-service": "migrate",
  "@ordella/organization-service": "migrate",
  "@ordella/terminal-service": "migrate",
  "@ordella/user-role-service": "migrate",
  "@ordella/staff-service": "migrate",
  "@ordella/audit-service": "migrate",
  "@ordella/file-storage-service": "migrate",
  "@ordella/notification-provider-service": "migrate",
  "@ordella/search-index-service": "migrate",
  "@ordella/ai-service": "migrate",
  "@ordella/ai-training-service": "migrate",
  "@ordella/ai-monitoring-service": "migrate",
  "@ordella/ai-deploy-service": "migrate",
  "@ordella/feature-flags-service": "migrate",
  "@ordella/ai-gateway-service": "migrate",
  "@ordella/ai-cost-service": "migrate",
  "@ordella/ai-security-service": "migrate",
  "@ordella/ai-observability-service": "migrate",
  "@ordella/ai-agents-service": "migrate",
  "@ordella/api-gateway": "node",
  "@ordella/pharmacy-service": "migrate",
  "@ordella/clinic-backend": "migrate",
};

function slimStartCmd(startType, entry) {
  switch (startType) {
    case "migrate":
      return `["sh", "-c", "npx prisma migrate deploy && node ${entry}"]`;
    case "dbpush":
      return `["sh", "-c", "npx prisma db push --skip-generate && node ${entry}"]`;
    case "dbpush-loss":
      return `["sh", "-c", "npx prisma db push --skip-generate --accept-data-loss && node ${entry}"]`;
    default:
      return `["node", "${entry}"]`;
  }
}

function fixSlimCmd(filePath) {
  const content = readFileSync(filePath, "utf8");
  if (!content.includes("FROM build AS deploy")) return false;

  const filterMatch = content.match(/pnpm install --filter ([^\s]+)/);
  if (!filterMatch) return false;
  const pkg = filterMatch[1].replace(/\.\.\.$/, "");
  const startType = SERVICE_START[pkg] ?? "node";

  const serviceCopyMatch = content.match(
    /COPY --from=build \/app\/(services\/[^\s]+|backend)\/dist \.\/dist/,
  );
  if (!serviceCopyMatch) return false;

  const entry = readStartScript(join(ROOT, serviceCopyMatch[1]));
  const slimCmd = slimStartCmd(startType, entry);
  const updated = content.replace(/CMD (\[[^\]]+\])/, `CMD ${slimCmd}`);
  if (updated === content) return false;
  writeFileSync(filePath, updated, "utf8");
  console.log(`fixed cmd: ${filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
  return true;
}

function discoverSlimDockerfiles() {
  const files = [];
  for (const name of readdirSync(join(ROOT, "services"))) {
    const dockerfile = join(ROOT, "services", name, "Dockerfile");
    try {
      if (statSync(dockerfile).isFile()) files.push(dockerfile);
    } catch {
      /* skip */
    }
  }
  const backendDockerfile = join(ROOT, "backend", "Dockerfile");
  if (statSync(backendDockerfile).isFile()) files.push(backendDockerfile);
  return files.filter((filePath) => readFileSync(filePath, "utf8").includes("FROM build AS deploy"));
}

function buildDeployStage(pkg) {
  return `# ---------------------------------------------------------
# 2b. DEPLOY STAGE — production dependencies only (<400MB)
# ---------------------------------------------------------
FROM build AS deploy-src
RUN pnpm deploy --filter=${pkg} --prod /deploy ${DEPLOY_PRUNE}

FROM node:18-bookworm-slim AS deploy
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates python3 make g++ \\
  && rm -rf /var/lib/apt/lists/*
COPY --from=deploy-src /deploy /deploy
WORKDIR /deploy
RUN mkdir -p /opt/peers && cd /opt/peers && npm init -y \\
  && npm install --omit=dev bcrypt@5.1.1 @nestjs/microservices@10.4.15 jsonwebtoken@9.0.2 \\
  && cp -rn /opt/peers/node_modules/. /deploy/node_modules/
`;
}

function buildProductionStage(meta) {
  const { buildServicePath, usesPrisma, isBookworm } = meta;

  const envCleanup =
    buildServicePath === "services/billing-service"
      ? "\nRUN rm -f .env .env.local 2>/dev/null || true"
      : "";

  if (isBookworm) {
    return `# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Debian slim (Prisma / native modules)
# ---------------------------------------------------------
FROM node:18-bookworm-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \\
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deploy /deploy/ ./
COPY --from=build /app/${buildServicePath}/dist ./dist${envCleanup}
`;
  }

  const openssl = usesPrisma ? "RUN apk add --no-cache openssl\n" : "";

  return `# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
${openssl}WORKDIR /app
ENV NODE_ENV=production

COPY --from=deploy /deploy/ ./
COPY --from=build /app/${buildServicePath}/dist ./dist${envCleanup}
`;
}

function patchDockerfile(filePath) {
  const content = readFileSync(filePath, "utf8");
  if (content.includes("FROM build AS deploy-src")) {
    console.log(`skip (already slim): ${filePath.replace(ROOT + "/", "")}`);
    return false;
  }

  const meta = parseDockerfile(content, filePath);

  const deployStage = buildDeployStage(meta.pkg);

  const productionStage = buildProductionStage({ ...meta, isBookworm: true });

  const oldBlock = /# ---------------------------------------------------------\n# 2b\. DEPLOY STAGE[\s\S]*?COPY --from=build \/app\/node_modules[\s\S]*?(?=EXPOSE )/;
  if (oldBlock.test(content)) {
    throw new Error(`Unexpected existing slim block in ${filePath}`);
  }

  const replaced = content.replace(
    /(?:# -+\n# 3\. PRODUCTION STAGE[\s\S]*?|FROM node:[^\n]+ AS production\n(?:(?:RUN|WORKDIR|ENV)[^\n]+\n)*?)COPY --from=workspace[^\n]+\nCOPY --from=build \/app\/node_modules[^\n]+\nCOPY --from=build \/app\/packages[^\n]+\nCOPY --from=build \/app\/shared[^\n]+\nCOPY --from=build \/app\/[^\n]+\n(?:RUN rm -f[^\n]+\n)?/,
    `${deployStage}${productionStage}`,
  );

  const withCmd = replaced.replace(/CMD (\[[^\]]+\])/, `CMD ${meta.slimCmd}`);

  if (withCmd === content) {
    console.log(`skip (pattern mismatch): ${filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
    return false;
  }

  writeFileSync(filePath, withCmd, "utf8");
  console.log(`slim: ${filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
  return true;
}

let count = 0;
for (const file of discoverDockerfiles()) {
  if (patchDockerfile(file)) count++;
}

let cmdFixes = 0;
for (const file of discoverSlimDockerfiles()) {
  if (fixSlimCmd(file)) cmdFixes++;
}

console.log(`Done. Updated ${count} Dockerfile(s), fixed ${cmdFixes} CMD(s).`);
