const path = require("node:path");

const toolingRoot = path.join(__dirname, "..");

/** @type {import("jest").Config} */
module.exports = {
  displayName: "frontend",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  testMatch: ["**/*.(spec|test).{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: [path.join(__dirname, "jest.setup.ts")],
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/*.d.ts",
    "!**/.next/**",
    "!**/node_modules/**",
    "!**/*.config.{js,ts}",
  ],
  coverageDirectory: "<rootDir>/coverage/frontend",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  passWithNoTests: true,
  verbose: true,
  globals: {
    TOOLING_LAYER_ROOT: toolingRoot,
  },
};
