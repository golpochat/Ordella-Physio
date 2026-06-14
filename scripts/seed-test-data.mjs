#!/usr/bin/env node
/**
 * Seeds realistic test fixtures and JWT tokens for integration / workflow tests.
 *
 * Default mode outputs fixture JSON to stdout.
 * Pass --live to register/login against a running auth-service (or api-gateway).
 *
 * Environment:
 *   JWT_SECRET              — signing secret (min 32 chars)
 *   AUTH_SERVICE_URL        — default http://localhost:3051
 *   API_GATEWAY_URL         — used when --via-gateway
 *   TEST_TENANT_ID          — default tenant-seed-1
 *   TEST_USER_EMAIL         — default owner@seed.test
 *   TEST_USER_PASSWORD      — default SeedTest123!
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const require = createRequire(join(repoRoot, "package.json"));

const jwt = require("jsonwebtoken");

const TENANT_ID = process.env.TEST_TENANT_ID ?? "tenant-seed-1";
const USER_EMAIL = process.env.TEST_USER_EMAIL ?? "owner@seed.test";
const USER_PASSWORD = process.env.TEST_USER_PASSWORD ?? "SeedTest123!";
const JWT_SECRET =
  process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://localhost:3051";
const API_GATEWAY_URL =
  process.env.API_GATEWAY_URL ?? "http://localhost:3049";

const args = new Set(process.argv.slice(2));
const live = args.has("--live");
const viaGateway = args.has("--via-gateway");

function signAccessToken(userId, tenantId, role = "OWNER") {
  return jwt.sign(
    {
      sub: userId,
      userId,
      tenantId,
      role,
      email: USER_EMAIL,
      type: "access",
    },
    JWT_SECRET,
    { expiresIn: "1h", algorithm: "HS256" },
  );
}

function signRefreshToken(userId, tenantId, role = "OWNER") {
  return jwt.sign(
    {
      sub: userId,
      userId,
      tenantId,
      role,
      email: USER_EMAIL,
      type: "refresh",
    },
    JWT_SECRET,
    { expiresIn: "7d", algorithm: "HS256" },
  );
}

function buildFixtures(userId = "user-seed-1") {
  const tenant = {
    id: TENANT_ID,
    name: "Seed Test Clinic",
    slug: "seed-test-clinic",
    timezone: "Europe/London",
    currency: "GBP",
  };

  const user = {
    id: userId,
    tenantId: TENANT_ID,
    email: USER_EMAIL,
    role: "OWNER",
    firstName: "Seed",
    lastName: "Owner",
  };

  const patient = {
    id: "patient-seed-1",
    tenantId: TENANT_ID,
    firstName: "Alex",
    lastName: "Patient",
    email: "alex.patient@seed.test",
    phone: "+447700900123",
  };

  const appointment = {
    id: "appointment-seed-1",
    tenantId: TENANT_ID,
    patientId: patient.id,
    therapistId: userId,
    locationId: "location-seed-1",
    startTime: "2026-06-15T09:00:00.000Z",
    endTime: "2026-06-15T10:00:00.000Z",
    type: "Initial Assessment",
    status: "SCHEDULED",
  };

  const tokens = {
    accessToken: signAccessToken(userId, TENANT_ID),
    refreshToken: signRefreshToken(userId, TENANT_ID),
  };

  return { tenant, user, patient, appointment, tokens };
}

async function tryLiveSeed() {
  const baseUrl = viaGateway ? API_GATEWAY_URL : AUTH_SERVICE_URL;
  const registerUrl = `${baseUrl}/auth/register`;
  const loginUrl = `${baseUrl}/auth/login`;

  const headers = {
    "content-type": "application/json",
    "x-tenant-id": TENANT_ID,
  };

  let userId = "user-seed-1";
  let tokens = null;

  try {
    const registerResponse = await fetch(registerUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: USER_EMAIL,
        password: USER_PASSWORD,
        role: "OWNER",
      }),
    });

    if (registerResponse.ok) {
      const body = await registerResponse.json();
      userId = body?.user?.id ?? body?.data?.user?.id ?? userId;
      tokens = {
        accessToken: body?.accessToken ?? body?.data?.accessToken,
        refreshToken: body?.refreshToken ?? body?.data?.refreshToken,
      };
    } else if (registerResponse.status === 409) {
      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: USER_EMAIL,
          password: USER_PASSWORD,
        }),
      });

      if (!loginResponse.ok) {
        const detail = await loginResponse.text();
        throw new Error(`Login failed (${loginResponse.status}): ${detail}`);
      }

      const body = await loginResponse.json();
      userId = body?.user?.id ?? body?.data?.user?.id ?? userId;
      tokens = {
        accessToken: body?.accessToken ?? body?.data?.accessToken,
        refreshToken: body?.refreshToken ?? body?.data?.refreshToken,
      };
    } else {
      const detail = await registerResponse.text();
      throw new Error(`Register failed (${registerResponse.status}): ${detail}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[seed-test-data] Live seed skipped: ${message}`);
    return null;
  }

  const fixtures = buildFixtures(userId);
  if (tokens?.accessToken) {
    fixtures.tokens = tokens;
  }

  fixtures.source = viaGateway ? "api-gateway" : "auth-service";
  fixtures.live = true;
  return fixtures;
}

async function main() {
  let result = buildFixtures();

  if (live) {
    const liveResult = await tryLiveSeed();
    if (liveResult) {
      result = liveResult;
    } else {
      result.mode = "fixtures-only";
      result.note =
        "Live seed unavailable; returned static fixtures with signed JWT tokens.";
    }
  }

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
