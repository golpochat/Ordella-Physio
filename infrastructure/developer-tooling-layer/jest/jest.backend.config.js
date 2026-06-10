const path = require("node:path");

const toolingRoot = path.join(__dirname, "..");

/** @type {import("jest").Config} */
module.exports = {
  displayName: "backend",
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: ["**/*.(spec|test).ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  setupFilesAfterEnv: [path.join(__dirname, "jest.setup.ts")],
  collectCoverageFrom: [
    "**/*.{ts,js}",
    "!**/*.d.ts",
    "!**/dist/**",
    "!**/node_modules/**",
    "!**/*.config.{js,ts}",
  ],
  coverageDirectory: "<rootDir>/coverage/backend",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  passWithNoTests: true,
  verbose: true,
  globals: {
    TOOLING_LAYER_ROOT: toolingRoot,
  },
};
