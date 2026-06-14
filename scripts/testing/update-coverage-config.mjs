#!/usr/bin/env node
/**
 * Phase 3 coverage config — per-controller thresholds on tested handlers.
 */
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dirname, "../..");

const SERVICE_COVERAGE = {
  "auth-service": {
    files: [
      "src/auth/auth.controller.ts",
      "src/controllers/token.controller.ts",
      "src/controllers/mfa.controller.ts",
    ],
    threshold: 40,
  },
  "api-gateway": {
    files: ["src/gateway/gateway.controller.ts"],
    threshold: 30,
  },
  "tenant-service": {
    files: ["src/tenants/tenants.controller.ts"],
    threshold: 40,
  },
  "patient-service": {
    files: ["src/patients/patients.controller.ts"],
    threshold: 30,
  },
  "appointment-service": {
    files: ["src/appointments/appointments.controller.ts"],
    threshold: 25,
  },
  "billing-service": {
    files: ["src/invoices/invoices.controller.ts"],
    threshold: 25,
  },
  "subscription-billing": {
    files: [
      "src/controllers/health.controller.ts",
      "src/controllers/subscription.controller.ts",
    ],
    threshold: 25,
  },
  "file-storage": {
    files: ["src/controllers/file.controller.ts"],
    threshold: 25,
  },
  "search-index": {
    files: [
      "src/controllers/health.controller.ts",
      "src/controllers/search.controller.ts",
    ],
    threshold: 25,
  },
  "ai-gateway": {
    files: [
      "src/controllers/health.controller.ts",
      "src/controllers/gateway.controller.ts",
    ],
    threshold: 20,
  },
  ai: {
    files: [
      "src/controllers/health.controller.ts",
      "src/controllers/inference.controller.ts",
    ],
    threshold: 25,
  },
};

for (const [dir, spec] of Object.entries(SERVICE_COVERAGE)) {
  const path = join(repoRoot, "services", dir, "jest.config.ts");
  if (!existsSync(path)) continue;

  const collectCoverageFrom = spec.files.map((file) => `'${file}'`).join(",\n    ");
  const thresholdEntries = spec.files
    .map(
      (file) => `    './${file.replace(/\\/g, "/")}': {
      branches: 0,
      functions: 15,
      lines: ${spec.threshold},
      statements: ${spec.threshold},
    }`,
    )
    .join(",\n");

  const config = `import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\\\.spec\\\\.ts$',
  transform: {
    '^.+\\\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    ${collectCoverageFrom},
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', 'generated/prisma'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
${thresholdEntries},
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
`;

  writeFileSync(path, config);
  console.log(`Updated ${dir} coverage (${spec.files.length} controllers @ ${spec.threshold}%)`);
}

console.log("Per-controller coverage thresholds applied.");
