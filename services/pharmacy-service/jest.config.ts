import { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/controllers/prescriptions.controller.ts",
    "src/controllers/fulfillment.controller.ts",
    "src/controllers/pharmacy-health.controller.ts",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "generated/prisma"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/test-setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
