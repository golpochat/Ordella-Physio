import "@testing-library/jest-dom";

// Global test timeout scaffold
jest.setTimeout(30_000);

// Correlation ID placeholder for observability-aware tests
process.env.OTEL_SERVICE_NAME = process.env.OTEL_SERVICE_NAME ?? "ordella-test";

beforeEach(() => {
  jest.clearAllMocks();
});
