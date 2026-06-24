#!/usr/bin/env node
/**
 * Fixes slim Dockerfiles:
 * 1. Resolve peer deps after pnpm deploy (on bookworm, same as production)
 * 2. Use node:18-bookworm-slim for Nest production (bcrypt / Prisma glibc)
 *
 * Run: node scripts/docker/patch-deploy-runtime.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const PRUNE = `  && rm -rf /deploy/src /deploy/test /deploy/coverage /deploy/.turbo \\
  && rm -f /deploy/tsconfig*.json /deploy/jest.config.ts /deploy/nest-cli.json \\
  && rm -f /deploy/test-setup.ts /deploy/.eslintrc.cjs /deploy/.prettierrc \\
  && rm -f /deploy/Dockerfile /deploy/.dockerignore /deploy/README.md /deploy/.env.example`;

function listDockerfiles() {
  const files = [];
  for (const name of readdirSync(join(ROOT, "services"))) {
    const f = join(ROOT, "services", name, "Dockerfile");
    try {
      if (statSync(f).isFile() && readFileSync(f, "utf8").includes("FROM build AS deploy")) {
        files.push(f);
      }
    } catch {
      /* skip */
    }
  }
  const backend = join(ROOT, "backend", "Dockerfile");
  if (statSync(backend).isFile() && readFileSync(backend, "utf8").includes("FROM build AS deploy")) {
    files.push(backend);
  }
  return files.sort();
}

function patch(content) {
  const filterMatch = content.match(/pnpm deploy --filter=([^\s]+) --prod/);
  if (!filterMatch) return null;
  const pkg = filterMatch[1];

  // Replace single-stage deploy with bookworm peer install
  const deployBlock = `# ---------------------------------------------------------
# 2b. DEPLOY STAGE — production dependencies only (<400MB)
# ---------------------------------------------------------
FROM build AS deploy-src
RUN pnpm deploy --filter=${pkg} --prod /deploy ${PRUNE}

FROM node:18-bookworm-slim AS deploy
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates python3 make g++ \\
  && rm -rf /var/lib/apt/lists/*
COPY --from=deploy-src /deploy /deploy
WORKDIR /deploy
RUN mkdir -p /opt/peers && cd /opt/peers && npm init -y \\
  && npm install --omit=dev bcrypt@5.1.1 @nestjs/microservices@10.4.15 jsonwebtoken@9.0.2 \\
  && cp -rn /opt/peers/node_modules/. /deploy/node_modules/
`;

  let out = content.replace(
    /# ---------------------------------------------------------\n# 2b\. DEPLOY STAGE[\s\S]*?(?=# ---------------------------------------------------------\n# 3\. PRODUCTION STAGE)/,
    deployBlock,
  );

  if (out === content) return null;

  // Production: bookworm-slim, copy from deploy (not deploy-src)
  out = out.replace(
    /# 3\. PRODUCTION STAGE[^\n]*\n# ---------------------------------------------------------\nFROM node:18-(?:alpine|bookworm-slim) AS production\n(?:RUN apt-get[\s\S]*?\n|RUN apk[\s\S]*?\n|)WORKDIR \/app\nENV NODE_ENV=production\n\nCOPY --from=deploy(?:-src)? \/deploy\/ \.\//,
    `# 3. PRODUCTION STAGE — bookworm slim (glibc native modules)
# ---------------------------------------------------------
FROM node:18-bookworm-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \\
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deploy /deploy/ ./`,
  );

  return out;
}

let n = 0;
for (const file of listDockerfiles()) {
  const content = readFileSync(file, "utf8");
  const updated = patch(content);
  if (!updated || updated === content) {
    console.log(`skip: ${file.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
    continue;
  }
  writeFileSync(file, updated, "utf8");
  console.log(`patched: ${file.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
  n++;
}
console.log(`Done. Patched ${n} Dockerfile(s).`);
