#!/usr/bin/env node
/**
 * Applies the canonical .dockerignore template to the repo root and every
 * service/app directory that contains a Dockerfile.
 */
import { writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Root workspace context — only packages/shared + lockfiles (service source is local context). */
const ROOT_DOCKERIGNORE = `# Workspace additional_context — exclude service/app sources and host artifacts
apps
services
deploy
infrastructure
docs
k8s
scripts
tests
.github
.cursor
agent-transcripts

# Node modules (never copy from host)
node_modules
**/node_modules
**/node_modules/**

# Build output
dist
build
.next
.turbo

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
docker-compose.full.yml

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

const SERVICE_DOCKERIGNORE = `# Node modules (never copy from host)
node_modules
**/node_modules
**/node_modules/**

# Build output
dist
build
.next
.turbo

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

function writeDockerignore(relativeDir, content) {
  const dir = relativeDir ? join(ROOT, relativeDir) : ROOT;
  mkdirSync(dir, { recursive: true });
  const file = join(dir, ".dockerignore");
  writeFileSync(file, content, "utf8");
  console.log(`wrote ${relativeDir ? `${relativeDir}/.dockerignore` : ".dockerignore"}`);
}

function dirsWithDockerfile(parent) {
  const base = join(ROOT, parent);
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => existsSync(join(base, entry.name, "Dockerfile")))
    .map((entry) => `${parent}/${entry.name}`);
}

writeDockerignore("", ROOT_DOCKERIGNORE);

const dirs = [...dirsWithDockerfile("services"), ...dirsWithDockerfile("apps")].sort();

for (const dir of dirs) {
  writeDockerignore(dir, SERVICE_DOCKERIGNORE);
}

console.log(`Done. ${dirs.length + 1} .dockerignore file(s) updated.`);
