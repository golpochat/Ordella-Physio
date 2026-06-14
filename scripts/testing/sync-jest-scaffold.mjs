#!/usr/bin/env node
/**
 * Adds Jest scaffolding to services missing test infrastructure.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SERVICES_DIR = join(ROOT, "services");

const JEST_CONFIG = `import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\\\.spec\\\\.ts$',
  transform: {
    '^.+\\\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
`;

const TEST_SETUP = `process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://physio:physio@localhost:5433/ordella_test?schema=public";
process.env.PORT = process.env.PORT ?? "3000";
process.env.NATS_URL = process.env.NATS_URL ?? "nats://localhost:4222";
`;

const APP_SPEC = `import { Test, TestingModule } from "@nestjs/testing";
import { TestAppModule } from "../src/test/test-app.module";

describe("AppModule", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it("should compile the module", () => {
    expect(module).toBeDefined();
  });
});
`;

const TEST_APP_MODULE = `import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
  ],
})
export class TestAppModule {}
`;

const TEST_SCRIPTS = {
  test: "jest --config ./jest.config.ts",
  "test:watch": "jest --watch --config ./jest.config.ts",
  "test:cov": "jest --coverage --config ./jest.config.ts",
  "test:e2e": "jest --config ./jest.config.ts --testPathPattern=e2e --passWithNoTests",
};

const DEV_DEPS = {
  "@types/jest": "^29.5.14",
  jest: "^29.7.0",
  "ts-jest": "^29.2.5",
};

function listServices() {
  return readdirSync(SERVICES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(SERVICES_DIR, name, "package.json")));
}

function updatePackageJson(serviceDir) {
  const pkgPath = join(serviceDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.scripts = { ...pkg.scripts, ...TEST_SCRIPTS };
  pkg.devDependencies = { ...pkg.devDependencies, ...DEV_DEPS };
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

let created = 0;

for (const service of listServices()) {
  const serviceDir = join(SERVICES_DIR, service);
  const hasJest = existsSync(join(serviceDir, "jest.config.ts"));

  if (hasJest) {
    updatePackageJson(serviceDir);
    continue;
  }

  writeFileSync(join(serviceDir, "jest.config.ts"), JEST_CONFIG, "utf8");
  writeFileSync(join(serviceDir, "test-setup.ts"), TEST_SETUP, "utf8");
  mkdirSync(join(serviceDir, "test"), { recursive: true });
  writeFileSync(join(serviceDir, "test", "app.spec.ts"), APP_SPEC, "utf8");
  mkdirSync(join(serviceDir, "src", "test"), { recursive: true });
  writeFileSync(join(serviceDir, "src", "test", "test-app.module.ts"), TEST_APP_MODULE, "utf8");
  updatePackageJson(serviceDir);
  created += 1;
  console.log(`scaffolded services/${service}`);
}

console.log(`Done. ${created} service(s) scaffolded.`);
