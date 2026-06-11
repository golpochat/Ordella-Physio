import jwt, { type Algorithm, type SignOptions, type VerifyOptions } from "jsonwebtoken";
import { createJwtConfigFromEnv, type JwtConfig } from "@ordella/security";

export type ActionTokenPayload = {
  userId: string;
  tenantId: string;
  email: string;
  type: "password_reset" | "email_verification";
};

const RESET_TOKEN_EXPIRY = "30m";
const VERIFICATION_TOKEN_EXPIRY = "24h";

const jwtConfig = createJwtConfigFromEnv();

function resolveSignKey(config: JwtConfig): string {
  if (config.algorithm === "RS256") {
    if (!config.privateKey) {
      throw new Error("RS256 requires privateKey");
    }
    return config.privateKey;
  }

  if (!config.secret) {
    throw new Error("HS256 requires secret");
  }

  return config.secret;
}

function resolveVerifyKey(config: JwtConfig): string {
  if (config.algorithm === "RS256") {
    if (!config.publicKey) {
      throw new Error("RS256 requires publicKey");
    }
    return config.publicKey;
  }

  if (!config.secret) {
    throw new Error("HS256 requires secret");
  }

  return config.secret;
}

function buildSignOptions(config: JwtConfig, expiresIn: string): SignOptions {
  return {
    algorithm: (config.algorithm ?? "HS256") as Algorithm,
    expiresIn: expiresIn as SignOptions["expiresIn"],
    ...(config.issuer ? { issuer: config.issuer } : {}),
    ...(config.audience ? { audience: config.audience } : {}),
  };
}

function buildVerifyOptions(config: JwtConfig): VerifyOptions {
  return {
    algorithms: [(config.algorithm ?? "HS256") as Algorithm],
    ...(config.issuer ? { issuer: config.issuer } : {}),
    ...(config.audience ? { audience: config.audience } : {}),
  };
}

function signActionToken(
  input: { userId: string; tenantId: string; email: string },
  type: ActionTokenPayload["type"],
  expiresIn: string,
): string {
  return jwt.sign(
    { ...input, type },
    resolveSignKey(jwtConfig),
    buildSignOptions(jwtConfig, expiresIn),
  );
}

function verifyActionToken(token: string, expectedType: ActionTokenPayload["type"]): ActionTokenPayload {
  const payload = jwt.verify(token, resolveVerifyKey(jwtConfig), buildVerifyOptions(jwtConfig)) as ActionTokenPayload;

  if (payload.type !== expectedType) {
    throw new Error("Invalid token type");
  }

  if (!payload.userId || !payload.tenantId || !payload.email) {
    throw new Error("Invalid token payload");
  }

  return payload;
}

export function generateResetToken(input: { userId: string; tenantId: string; email: string }): string {
  return signActionToken(input, "password_reset", RESET_TOKEN_EXPIRY);
}

export function generateEmailVerificationToken(input: { userId: string; tenantId: string; email: string }): string {
  return signActionToken(input, "email_verification", VERIFICATION_TOKEN_EXPIRY);
}

export function verifyResetToken(token: string): ActionTokenPayload {
  return verifyActionToken(token, "password_reset");
}

export function verifyEmailVerificationToken(token: string): ActionTokenPayload {
  return verifyActionToken(token, "email_verification");
}
