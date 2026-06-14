#!/usr/bin/env node
/**
 * Applies Phase 3 jest coverage thresholds and e2e test-setup to critical services.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dirname, "../..");

const CRITICAL_SERVICES = [
  { dir: "auth-service", threshold: 45 },
  { dir: "api-gateway", threshold: 40 },
  { dir: "tenant-service", threshold: 40 },
  { dir: "patient-service", threshold: 40 },
  { dir: "appointment-service", threshold: 40 },
  { dir: "billing-service", threshold: 40 },
  { dir: "subscription-billing", threshold: 40 },
  { dir: "file-storage", threshold: 40 },
  { dir: "search-index", threshold: 40 },
  { dir: "ai-gateway", threshold: 40 },
  { dir: "ai", threshold: 40 },
];

const TEST_SETUP = `process.env.NODE_ENV = "test";
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
process.env.API_GATEWAY_URL = process.env.API_GATEWAY_URL ?? "http://localhost:3049";
process.env.GATEWAY_PROBE_TIMEOUT_MS = process.env.GATEWAY_PROBE_TIMEOUT_MS ?? "1500";
jest.setTimeout(20000);
`;

const E2E_DEPS = {
  "@ordella/testing": "workspace:*",
  supertest: "^7.0.0",
  "@types/supertest": "^6.0.2",
};

function patchJestConfig(serviceDir, threshold) {
  const path = join(repoRoot, "services", serviceDir, "jest.config.ts");
  if (!existsSync(path)) return;

  let content = readFileSync(path, "utf8");
  if (content.includes("coverageThreshold")) return;

  const injection = `
  coverageThreshold: {
    global: {
      branches: ${threshold},
      functions: ${threshold},
      lines: ${threshold},
      statements: ${threshold},
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
`;

  content = content.replace(
    /collectCoverageFrom: \[[^\]]+\],/,
    (match) => `${match}\n${injection}`,
  );

  writeFileSync(path, content);
}

function patchPackageJson(serviceDir) {
  const path = join(repoRoot, "services", serviceDir, "package.json");
  if (!existsSync(path)) return;

  const pkg = JSON.parse(readFileSync(path, "utf8"));
  pkg.devDependencies ??= {};

  for (const [name, version] of Object.entries(E2E_DEPS)) {
    pkg.devDependencies[name] ??= version;
  }

  pkg.scripts ??= {};
  pkg.scripts["test:e2e"] =
    'jest --config ./jest.config.ts --testPathPattern="\\.service\\.e2e\\.spec\\.ts$" --passWithNoTests';

  writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`);
}

function patchTestSetup(serviceDir) {
  const path = join(repoRoot, "services", serviceDir, "test-setup.ts");
  if (!existsSync(path)) return;
  const current = readFileSync(path, "utf8");
  if (current.includes("API_GATEWAY_URL")) return;
  writeFileSync(path, `${current.trimEnd()}\n${TEST_SETUP.split("\n").slice(1).join("\n")}`);
}

for (const service of CRITICAL_SERVICES) {
  patchJestConfig(service.dir, service.threshold);
  patchPackageJson(service.dir);
  patchTestSetup(service.dir);
  console.log(`Patched ${service.dir}`);
}

console.log("Phase 3 service jest scaffolding applied.");
