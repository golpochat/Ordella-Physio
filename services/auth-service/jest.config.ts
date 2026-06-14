import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/auth/auth.controller.ts',
    'src/controllers/token.controller.ts',
    'src/controllers/mfa.controller.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', 'generated/prisma'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    './src/auth/auth.controller.ts': {
      branches: 0,
      functions: 15,
      lines: 40,
      statements: 40,
    },
    './src/controllers/token.controller.ts': {
      branches: 0,
      functions: 15,
      lines: 40,
      statements: 40,
    },
    './src/controllers/mfa.controller.ts': {
      branches: 0,
      functions: 15,
      lines: 40,
      statements: 40,
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
