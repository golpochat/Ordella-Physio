import type { INestApplication } from "@nestjs/common";
import {
  jwtFactory,
  jwtFactoryHeaders,
  publicRequest,
  authenticatedRequest,
} from "@ordella/testing";
import {
  createAuthTestApp,
  mockAuthService,
  mockMfaService,
  mockRefreshTokenCommand,
  mockTokenService,
  resetAuthMocks,
  TEST_TENANT_ID,
  TEST_USER_ID,
} from "./helpers/create-auth-test-app";
import { invalidCredentialsError } from "@/utils/auth-errors";

describe("Auth API", () => {
  let app: INestApplication;

  beforeAll(async () => {
    ({ app } = await createAuthTestApp());
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    resetAuthMocks();
  });

  describe("POST /auth/register", () => {
    it("returns tokens when registration succeeds", async () => {
      const payload = {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: { id: TEST_USER_ID, email: "owner@test.example", tenantId: TEST_TENANT_ID },
      };
      mockAuthService.register.mockResolvedValue(payload);

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/register")
        .send({
          email: "owner@test.example",
          password: "Password123!",
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(payload);
      expect(mockAuthService.register).toHaveBeenCalledWith(
        TEST_TENANT_ID,
        expect.objectContaining({ email: "owner@test.example" }),
        expect.any(Object),
      );
    });

    it("rejects missing required fields", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/register")
        .send({ email: "owner@test.example" });

      expect(response.status).toBe(400);
      expect(mockAuthService.register).not.toHaveBeenCalled();
    });
  });

  describe("POST /auth/login", () => {
    it("returns tokens for valid credentials", async () => {
      const payload = {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: { id: TEST_USER_ID, email: "owner@test.example" },
      };
      mockAuthService.login.mockResolvedValue(payload);

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/login")
        .send({
          email: "owner@test.example",
          password: "Password123!",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(payload);
    });

    it("returns 401 for invalid credentials", async () => {
      mockAuthService.login.mockImplementation(() => {
        throw invalidCredentialsError();
      });

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/login")
        .send({
          email: "owner@test.example",
          password: "wrong-password",
        });

      expect(response.status).toBe(401);
      expect(response.body.error?.code ?? response.body.code).toBe("INVALID_CREDENTIALS");
    });

    it("rejects missing password", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/login")
        .send({ email: "owner@test.example" });

      expect(response.status).toBe(400);
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });
  });

  describe("POST /auth/refresh", () => {
    it("returns new tokens when refresh token is valid", async () => {
      mockRefreshTokenCommand.execute.mockResolvedValue({
        accessToken: "new-access",
        refreshToken: "new-refresh",
      });

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/refresh")
        .send({ refreshToken: "valid-refresh-token" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        accessToken: "new-access",
        refreshToken: "new-refresh",
      });
    });

    it("returns 401 when refresh token is missing", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/refresh")
        .send({});

      expect(response.status).toBe(401);
      const message = response.body.error?.message ?? response.body.message;
      expect(message).toMatch(/refresh token/i);
    });
  });

  describe("POST /auth/logout", () => {
    it("revokes the refresh token", async () => {
      mockTokenService.revokeToken.mockResolvedValue({ success: true });

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/logout")
        .send({ refreshToken: "refresh-to-revoke" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
      expect(mockTokenService.revokeToken).toHaveBeenCalledWith(
        "refresh-to-revoke",
        expect.any(Object),
      );
    });
  });

  describe("GET /auth/me (JWT)", () => {
    it("returns the current user with a valid token", async () => {
      const user = { id: TEST_USER_ID, email: "owner@test.example", tenantId: TEST_TENANT_ID };
      mockAuthService.getMe.mockResolvedValue(user);

      const response = await authenticatedRequest(app, {
        tenantId: TEST_TENANT_ID,
        userId: TEST_USER_ID,
        accessToken: jwtFactory({
          tenantId: TEST_TENANT_ID,
          userId: TEST_USER_ID,
          secret: process.env.JWT_SECRET,
        }),
      }).get("/auth/me");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it("returns 401 for a malformed JWT", async () => {
      const response = await authenticatedRequest(app, {
        tenantId: TEST_TENANT_ID,
        accessToken: jwtFactory({ malformed: true }),
      }).get("/auth/me");

      expect(response.status).toBe(401);
    });

    it("returns 401 for an expired JWT", async () => {
      const response = await authenticatedRequest(app, {
        tenantId: TEST_TENANT_ID,
        accessToken: jwtFactory({
          tenantId: TEST_TENANT_ID,
          userId: TEST_USER_ID,
          expired: true,
          secret: process.env.JWT_SECRET,
        }),
      }).get("/auth/me");

      expect(response.status).toBe(401);
    });
  });

  describe("POST /auth/mfa/challenge", () => {
    it("completes MFA challenge when code is valid", async () => {
      mockMfaService.completeLoginChallenge.mockResolvedValue({
        accessToken: "mfa-access",
        refreshToken: "mfa-refresh",
      });

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/mfa/challenge")
        .send({ userId: TEST_USER_ID, token: "123456" });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBe("mfa-access");
    });

    it("rejects invalid MFA code format", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/mfa/challenge")
        .send({ userId: TEST_USER_ID, token: "abc" });

      expect(response.status).toBe(400);
      expect(mockMfaService.completeLoginChallenge).not.toHaveBeenCalled();
    });
  });

  describe("POST /auth/mfa/setup", () => {
    it("requires authentication", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/mfa/setup")
        .send({});

      expect(response.status).toBe(401);
    });

    it("returns MFA setup payload for authenticated users", async () => {
      mockMfaService.setupMfa.mockResolvedValue({
        secret: "BASE32SECRET",
        qrCodeUrl: "otpauth://totp/test",
      });

      const headers = jwtFactoryHeaders({
        tenantId: TEST_TENANT_ID,
        userId: TEST_USER_ID,
        secret: process.env.JWT_SECRET,
      });

      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/auth/mfa/setup")
        .set(headers);

      expect(response.status).toBe(200);
      expect(response.body.secret).toBe("BASE32SECRET");
    });
  });
});
