process.env.NODE_ENV = 'test';
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
process.env.API_GATEWAY_URL = process.env.API_GATEWAY_URL ?? "http://localhost:3049";
process.env.GATEWAY_PROBE_TIMEOUT_MS = process.env.GATEWAY_PROBE_TIMEOUT_MS ?? "1500";
jest.setTimeout(20000);
