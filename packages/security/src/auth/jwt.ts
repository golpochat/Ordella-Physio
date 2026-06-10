import jwt, { type Algorithm, type JwtPayload as JsonWebTokenPayload, type SignOptions, type VerifyOptions } from "jsonwebtoken";
import type { SecurityRole } from "../rbac/roles";

export type TokenPayloadBase = {
  sub: string;
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
  tokenId?: string;
};

export type AccessTokenPayload = TokenPayloadBase & {
  type: "access";
};

export type RefreshTokenPayload = TokenPayloadBase & {
  type: "refresh";
};

export type JwtAlgorithm = "HS256" | "RS256";

export type JwtConfig = {
  algorithm?: JwtAlgorithm;
  secret?: string;
  privateKey?: string;
  publicKey?: string;
  issuer?: string;
  audience?: string;
};

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

function buildSignOptions(config: JwtConfig, expiresIn: string | number): SignOptions {
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

export function signAccessToken(
  payload: TokenPayloadBase,
  expiresIn: string | number,
  config: JwtConfig,
): string {
  return jwt.sign({ ...payload, type: "access" }, resolveSignKey(config), buildSignOptions(config, expiresIn));
}

export function signRefreshToken(
  payload: TokenPayloadBase,
  expiresIn: string | number,
  config: JwtConfig,
): string {
  return jwt.sign({ ...payload, type: "refresh" }, resolveSignKey(config), buildSignOptions(config, expiresIn));
}

export function verifyToken<T extends AccessTokenPayload | RefreshTokenPayload = AccessTokenPayload>(
  token: string,
  config: JwtConfig,
): T {
  return jwt.verify(token, resolveVerifyKey(config), buildVerifyOptions(config)) as T;
}

export function decodeToken<T extends AccessTokenPayload | RefreshTokenPayload = AccessTokenPayload>(
  token: string,
): T | null {
  const decoded = jwt.decode(token) as T | null;
  return decoded;
}

export function isRefreshTokenPayload(
  payload: JsonWebTokenPayload | AccessTokenPayload | RefreshTokenPayload,
): payload is RefreshTokenPayload {
  return "type" in payload && payload.type === "refresh";
}

export function createJwtConfigFromEnv(): JwtConfig {
  return {
    algorithm: (process.env.JWT_ALGORITHM as JwtAlgorithm | undefined) ?? "HS256",
    secret: process.env.JWT_SECRET ?? process.env.JWT_ACCESS_SECRET,
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    issuer: process.env.JWT_ISSUER ?? "ordella",
    audience: process.env.JWT_AUDIENCE ?? "ordella-api",
  };
}
