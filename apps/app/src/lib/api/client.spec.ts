import { getGatewayUrl } from "@/lib/constants";

describe("API client configuration", () => {
  it("uses gateway URL on server", () => {
    expect(getGatewayUrl()).toBe(process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "http://localhost:4000");
  });
});

describe("Auth schemas", () => {
  it("validates auth response shape", async () => {
    const { authResponseSchema } = await import("@/lib/schemas");
    const parsed = authResponseSchema.parse({
      user: { id: "1", email: "a@b.com", role: "ADMIN", tenantId: "t1" },
      accessToken: "access",
      refreshToken: "refresh",
      expiresIn: 900,
    });
    expect(parsed.user.email).toBe("a@b.com");
  });
});

describe("Auth schemas", () => {
  it("validates auth response shape", async () => {
    const { authResponseSchema } = await import("@/lib/schemas");
    const parsed = authResponseSchema.parse({
      user: { id: "1", email: "a@b.com", role: "ADMIN", tenantId: "t1" },
      accessToken: "access",
      refreshToken: "refresh",
      expiresIn: 900,
    });
    expect(parsed.user.email).toBe("a@b.com");
  });
});
