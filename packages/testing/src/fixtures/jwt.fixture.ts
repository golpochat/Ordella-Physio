import jwt, { type SignOptions } from "jsonwebtoken";

export type JwtFactoryOptions = {
  secret?: string;
  tenantId?: string;
  userId?: string;
  role?: string;
  email?: string;
  expiresIn?: string | number;
  malformed?: boolean;
  expired?: boolean;
};

const DEFAULT_SECRET = "change-me-local-jwt-secret-min-32-chars";

export function jwtFactory(options: JwtFactoryOptions = {}): string {
  if (options.malformed) {
    return "not.a.valid.jwt.token";
  }

  const secret = options.secret ?? DEFAULT_SECRET;
  const now = Math.floor(Date.now() / 1000);

  const userId = options.userId ?? "user-test-1";

  const payload: Record<string, string | number> = {
    sub: userId,
    userId,
    tenantId: options.tenantId ?? "tenant-test-1",
    role: options.role ?? "OWNER",
    email: options.email ?? "owner@test.example",
    type: "access",
  };

  if (options.expired) {
    payload.iat = now - 7200;
    payload.exp = now - 3600;
    return jwt.sign(payload, secret);
  }

  return jwt.sign(payload, secret, {
    expiresIn: (options.expiresIn ?? "1h") as SignOptions["expiresIn"],
  });
}

export function jwtFactoryHeaders(
  options: JwtFactoryOptions = {},
): Record<string, string> {
  const tenantId = options.tenantId ?? "tenant-test-1";
  return {
    authorization: `Bearer ${jwtFactory(options)}`,
    "x-tenant-id": tenantId,
  };
}
