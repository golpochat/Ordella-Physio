#!/usr/bin/env node
/**
 * Generates standardized multi-stage Dockerfiles (base → build → production)
 * for all ordella-physio services and apps.
 *
 * Build context: ./services/<name> or ./apps/<name>
 * Monorepo deps: additional_contexts.workspace (repo root)
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const PROJECT = "ordella-physio";
const PNPM = "pnpm@9.15.4";
const NODE = "node:18-alpine";
const SYNTAX = "# syntax=docker/dockerfile:1.4";

const DOCKERIGNORE = `# Node modules (never copy from host)
node_modules
**/node_modules
**/node_modules/**

# Build output
dist
build
.next
.turbo
.next

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files
.env
.env.local
.env.*.local

# OS / Editor files
.DS_Store
Thumbs.db
.vscode
.idea

# Git
.git
.gitignore

# Docker
Dockerfile
docker-compose.yml
docker-compose.dev.yml

# Cache
.cache
.npm
.pnpm-store
.eslintcache

# Temporary files
*.tmp
*.swp
*.swo
`;

const nestServices = [
  { dir: "auth-service", pkg: "@ordella/auth-service", port: 3051, prisma: true, postBuild: ["cp -r src/email/templates dist/services/auth-service/src/email/"], start: "migrate" },
  { dir: "tenant-service", pkg: "@ordella/tenant-service", port: 3052, prisma: true, postBuild: ["cp -r src/generated dist/services/tenant-service/src/"], start: "dbpush-loss" },
  { dir: "patient-service", pkg: "@ordella/patient-service", port: 3053, prisma: true, postBuild: ["cp -r src/generated dist/services/patient-service/src/"], start: "dbpush" },
  { dir: "appointment-service", pkg: "@ordella/appointment-service", port: 3054, prisma: true, postBuild: ["cp -r src/generated dist/services/appointment-service/src/"], start: "dbpush" },
  { dir: "notes-service", pkg: "@ordella/notes-service", port: 3055, prisma: true, postBuild: ["cp -r src/generated dist/services/notes-service/src/"], start: "dbpush" },
  { dir: "billing-service", pkg: "@ordella/billing-service", port: 3056, prisma: true, postBuild: ["cp -r src/generated dist/services/billing-service/src/"], start: "migrate" },
  { dir: "payment-service", pkg: "@ordella/payment-service", port: 3057, prisma: true, postBuild: ["cp -r src/generated dist/services/payment-service/src/"], start: "dbpush" },
  { dir: "communication-service", pkg: "@ordella/communication-service", port: 3058, prisma: true, postBuild: ["cp -r src/generated dist/services/communication-service/src/", "cp -r src/templates/templates dist/services/communication-service/src/templates/"], start: "dbpush" },
  { dir: "reporting-service", pkg: "@ordella/reporting-service", port: 3059, prisma: true, postBuild: ["cp -r src/generated dist/services/reporting-service/src/"], start: "dbpush" },
  { dir: "event-bus-service", pkg: "@ordella/event-bus-service", port: 3060, prisma: true, postBuild: [], start: "node" },
  { dir: "messaging-service", pkg: "@ordella/messaging-service", port: 3061, prisma: true, postBuild: ["cp -r src/generated dist/services/messaging-service/src/"], start: "dbpush" },
  { dir: "notification-service", pkg: "@ordella/notification-service", port: 3062, prisma: true, postBuild: ["cp -r src/generated dist/services/notification-service/src/"], start: "dbpush" },
  { dir: "ai-notes-service", pkg: "@ordella/ai-notes-service", port: 3063, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-notes-service/src/"], start: "dbpush" },
  { dir: "marketplace-service", pkg: "@ordella/marketplace-service", port: 3064, prisma: true, postBuild: ["cp -r src/generated dist/services/marketplace-service/src/"], start: "dbpush" },
  { dir: "enterprise-service", pkg: "@ordella/enterprise-service", port: 3065, prisma: true, postBuild: ["cp -r src/generated dist/services/enterprise-service/src/"], start: "dbpush" },
  { dir: "organization-service", pkg: "@ordella/organization-service", port: 3066, prisma: true, postBuild: ["cp -r src/generated dist/services/organization-service/src/"], start: "migrate" },
  { dir: "terminal-service", pkg: "@ordella/terminal-service", port: 3067, prisma: true, postBuild: ["cp -r src/generated dist/services/terminal-service/src/"], start: "migrate" },
  { dir: "user-role-service", pkg: "@ordella/user-role-service", port: 3068, prisma: true, postBuild: ["cp -r src/generated dist/services/user-role-service/src/"], start: "migrate" },
  { dir: "staff-service", pkg: "@ordella/staff-service", port: 3069, prisma: true, postBuild: ["cp -r src/generated dist/services/staff-service/src/"], start: "migrate" },
  { dir: "audit", pkg: "@ordella/audit-service", port: 3070, prisma: true, postBuild: ["cp -r src/generated dist/services/audit/src/"], start: "migrate" },
  { dir: "file-storage", pkg: "@ordella/file-storage-service", port: 3071, prisma: true, postBuild: ["cp -r src/generated dist/services/file-storage/src/"], start: "migrate" },
  { dir: "notification-provider", pkg: "@ordella/notification-provider-service", port: 3072, prisma: true, postBuild: ["cp -r src/generated dist/services/notification-provider/src/"], start: "migrate" },
  { dir: "search-index", pkg: "@ordella/search-index-service", port: 3073, prisma: true, postBuild: ["cp -r src/generated dist/services/search-index/src/"], start: "migrate" },
  { dir: "subscription-billing", pkg: "@ordella/subscription-billing-service", port: 3074, prisma: true, postBuild: ["cp -r src/generated dist/services/subscription-billing/src/"], start: "migrate" },
  { dir: "ai", pkg: "@ordella/ai-service", port: 3075, prisma: true, postBuild: ["cp -r src/generated dist/services/ai/src/"], start: "migrate" },
  { dir: "ai-training", pkg: "@ordella/ai-training-service", port: 3076, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-training/src/"], start: "migrate" },
  { dir: "ai-monitoring", pkg: "@ordella/ai-monitoring-service", port: 3077, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-monitoring/src/"], start: "migrate" },
  { dir: "ai-deploy", pkg: "@ordella/ai-deploy-service", port: 3078, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-deploy/src/"], start: "migrate" },
  { dir: "feature-flags", pkg: "@ordella/feature-flags-service", port: 3079, prisma: true, postBuild: ["cp -r src/generated dist/services/feature-flags/src/"], start: "migrate" },
  { dir: "ai-gateway", pkg: "@ordella/ai-gateway-service", port: 3080, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-gateway/src/"], start: "migrate" },
  { dir: "ai-cost", pkg: "@ordella/ai-cost-service", port: 3081, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-cost/src/"], start: "migrate" },
  { dir: "ai-security", pkg: "@ordella/ai-security-service", port: 3082, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-security/src/"], start: "migrate" },
  { dir: "ai-observability", pkg: "@ordella/ai-observability-service", port: 3083, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-observability/src/"], start: "migrate" },
  { dir: "ai-agents", pkg: "@ordella/ai-agents-service", port: 3084, prisma: true, postBuild: ["cp -r src/generated dist/services/ai-agents/src/"], start: "migrate" },
  { dir: "api-gateway", pkg: "@ordella/api-gateway", port: 3049, prisma: false, postBuild: [], start: "node" },
];

function startCmd({ pkg, start }) {
  switch (start) {
    case "migrate":
      return `["sh", "-c", "pnpm --filter ${pkg} exec prisma migrate deploy && pnpm --filter ${pkg} start"]`;
    case "dbpush":
      return `["sh", "-c", "pnpm --filter ${pkg} exec prisma db push --skip-generate && pnpm --filter ${pkg} start"]`;
    case "dbpush-loss":
      return `["sh", "-c", "pnpm --filter ${pkg} exec prisma db push --skip-generate --accept-data-loss && pnpm --filter ${pkg} start"]`;
    default:
      return `["sh", "-c", "pnpm --filter ${pkg} start"]`;
  }
}

function nestDockerfile(svc) {
  const { dir, pkg, port, prisma, postBuild } = svc;
  const imageName = `${PROJECT}-${dir}`;

  const prismaBaseCopy = prisma
    ? `COPY prisma ./services/${dir}/prisma\n`
    : "";

  return `${SYNTAX}
# ${PROJECT} — ${pkg}
# Image: ${imageName}:latest
# Build context: ./services/${dir}  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM ${NODE} AS base
RUN corepack enable && corepack prepare ${PNPM} --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/${dir}/package.json
${prismaBaseCopy}RUN pnpm install --frozen-lockfile --filter ${pkg}...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/${dir}
RUN rm -rf services/${dir}/node_modules
RUN pnpm install --frozen-lockfile --filter ${pkg}...
RUN pnpm turbo run build --filter=${pkg}
WORKDIR /app/services/${dir}
RUN find dist -type f -name '*.js' -exec sed -i \\
    -e 's|require("\\.\\./\\.\\./\\.\\./packages/\\([^/]*\\)/src/index\\.ts")|require("@ordella/\\1")|g' \\
    -e 's|require("\\.\\./\\.\\./packages/\\([^/]*\\)/src/index\\.ts")|require("@ordella/\\1")|g' {} +${postBuild.length > 0 ? `\n${postBuild.map((l) => `RUN ${l}`).join("\n")}` : ""}

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM ${NODE} AS production
RUN corepack enable && corepack prepare ${PNPM} --activate
WORKDIR /app
ENV NODE_ENV=production

COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/shared ./shared
COPY --from=build /app/services/${dir} ./services/${dir}

EXPOSE ${port}

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ${startCmd(svc)}
`;
}

const nextApps = [
  {
    dir: "frontend-web",
    pkg: "@ordella/frontend-web",
    port: 3010,
    depsCopy: [
      "packages/config",
      "packages/shared",
      "packages/ui",
      "packages/utils",
      "packages/errors",
      "packages/security",
      "packages/validation",
    ],
    buildArgs: [
      "ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:3049",
      "ARG NEXT_PUBLIC_DEFAULT_TENANT_ID=demo-tenant",
      "ARG DEFAULT_TENANT_ID=demo-tenant",
      "ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL",
      "ENV NEXT_PUBLIC_DEFAULT_TENANT_ID=$NEXT_PUBLIC_DEFAULT_TENANT_ID",
      "ENV DEFAULT_TENANT_ID=$DEFAULT_TENANT_ID",
    ],
    postBuild: `RUN rm -rf .next/standalone/apps/frontend-web/.next/static && \\
    cp -r .next/static .next/standalone/apps/frontend-web/.next/static
RUN rm -rf .next/standalone/apps/frontend-web/public && \\
    if [ -d public ]; then cp -r public .next/standalone/apps/frontend-web/public; fi`,
    cmd: '["node", "apps/frontend-web/server.js"]',
  },
  {
    dir: "web",
    pkg: "@ordella/web",
    port: 3000,
    depsCopy: ["packages/config", "packages/shared", "packages/ui", "packages/utils"],
    buildArgs: [
      "ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:4000",
      "ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000",
      "ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL",
      "ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL",
    ],
    postBuild: "",
    cmd: '["node", "apps/web/server.js"]',
  },
  {
    dir: "admin-dashboard",
    pkg: "@ordella/admin-dashboard",
    port: 3000,
    depsCopy: [
      "packages/config",
      "packages/shared",
      "packages/ui",
      "packages/utils",
      "packages/errors",
      "packages/security",
      "packages/validation",
    ],
    buildArgs: [],
    postBuild: "",
    cmd: '["node", "apps/admin-dashboard/server.js"]',
  },
  {
    dir: "marketing-site",
    pkg: "@ordella/marketing-site",
    port: 3001,
    depsCopy: ["packages/config", "packages/shared", "packages/ui", "packages/utils"],
    buildArgs: [],
    postBuild: "",
    cmd: '["node", "apps/marketing-site/server.js"]',
  },
  {
    dir: "app",
    pkg: "@ordella/app",
    port: 3001,
    depsCopy: ["packages"],
    buildArgs: [
      "ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:4000",
      "ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL",
    ],
    postBuild: "",
    cmd: '["node", "apps/app/server.js"]',
    depsMode: "packages-all",
  },
];

function nextDockerfile(app) {
  const imageName = `${PROJECT}-${app.dir}`;
  const depsLines =
    app.depsMode === "packages-all"
      ? "COPY --from=workspace packages ./packages\nCOPY package.json ./apps/app/package.json"
      : `${app.depsCopy.map((p) => `COPY --from=workspace ${p} ./${p}`).join("\n")}\nCOPY package.json ./apps/${app.dir}/package.json`;

  const buildArgsBlock =
    app.buildArgs.length > 0 ? `\n${app.buildArgs.join("\n")}\n` : "\n";

  const buildSteps =
    app.dir === "frontend-web"
      ? `COPY . ./apps/${app.dir}
RUN rm -rf apps/${app.dir}/node_modules
RUN pnpm install --frozen-lockfile --filter=${app.pkg}
WORKDIR /app/apps/${app.dir}
ENV NEXT_TELEMETRY_DISABLED=1
${app.buildArgs.join("\n")}
RUN pnpm turbo run build --filter=${app.pkg}
${app.postBuild}`
      : `COPY . ./apps/${app.dir}
RUN rm -rf apps/${app.dir}/node_modules
RUN pnpm install --frozen-lockfile --filter=${app.pkg}
WORKDIR /app/apps/${app.dir}
ENV NEXT_TELEMETRY_DISABLED=1${buildArgsBlock}RUN pnpm turbo run build --filter=${app.pkg}${app.postBuild ? `\n${app.postBuild}` : ""}`;

  return `${SYNTAX}
# ${PROJECT} — ${app.pkg}
# Image: ${imageName}:latest
# Build context: ./apps/${app.dir}  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM ${NODE} AS base
RUN corepack enable && corepack prepare ${PNPM} --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
${depsLines}
COPY --from=workspace shared ./shared
RUN pnpm install --frozen-lockfile --filter ${app.pkg}...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build frontend assets
# ---------------------------------------------------------
FROM base AS build
${buildSteps}

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM ${NODE} AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=${app.port}
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/${app.dir}/.next/standalone ./
COPY --from=build /app/apps/${app.dir}/.next/static ./apps/${app.dir}/.next/static
COPY --from=build /app/apps/${app.dir}/public ./apps/${app.dir}/public

EXPOSE ${app.port}

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ${app.cmd}
`;
}

function write(relativePath, content) {
  const full = join(ROOT, relativePath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
  console.log(`wrote ${relativePath}`);
}

for (const svc of nestServices) {
  write(`services/${svc.dir}/Dockerfile`, nestDockerfile(svc));
  write(`services/${svc.dir}/.dockerignore`, DOCKERIGNORE);
}

for (const app of nextApps) {
  write(`apps/${app.dir}/Dockerfile`, nextDockerfile(app));
  write(`apps/${app.dir}/.dockerignore`, DOCKERIGNORE);
}

console.log("Done.");
