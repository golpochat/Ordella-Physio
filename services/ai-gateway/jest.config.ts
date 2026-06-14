import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/controllers/health.controller.ts',
    'src/controllers/gateway.controller.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', 'generated/prisma'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    './src/controllers/health.controller.ts': {
      branches: 0,
      functions: 15,
      lines: 20,
      statements: 20,
    },
    './src/controllers/gateway.controller.ts': {
      branches: 0,
      functions: 15,
      lines: 15,
      statements: 15,
    },
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
