import { randomUUID } from "node:crypto";

import jwt, { type JwtPayload as JwtLibPayload, type SignOptions } from "jsonwebtoken";

import { env } from "../config";
import { isAccessTokenRevoked } from "../modules/security/token-revocation.service";
import type { JwtPayload } from "../types/express";

const accessSignOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };
const refreshSignOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"] };

function getVerificationSecrets(primary: string, previous?: string): string[] {
  return previous ? [primary, previous] : [primary];
}

function decodePayload(record: JwtLibPayload & Record<string, unknown>): JwtPayload & { jti: string; tv: number; exp?: number } {
  return {
    sub: String(record.sub),
    tenantId: String(record.tenantId),
    email: String(record.email),
    roles: Array.isArray(record.roles) ? record.roles.map(String) : [],
    permissions: Array.isArray(record.permissions) ? record.permissions.map(String) : [],
    jti: typeof record.jti === "string" ? record.jti : "",
    tv: Number(record.tv ?? 0),
    exp: typeof record.exp === "number" ? record.exp : undefined,
  };
}

export function signAccessToken(payload: JwtPayload, tokenVersion = 0): string {
  return jwt.sign(
    {
      ...payload,
      jti: randomUUID(),
      tv: tokenVersion,
    },
    env.JWT_SECRET,
    accessSignOptions,
  );
}

export function signRefreshToken(userId: string, tenantId: string, tokenVersion = 0): string {
  return jwt.sign(
    { sub: userId, tenantId, type: "refresh", jti: randomUUID(), tv: tokenVersion },
    env.JWT_REFRESH_SECRET,
    refreshSignOptions,
  );
}

export async function verifyAccessToken(token: string, expectedTokenVersion?: number): Promise<JwtPayload & { jti: string }> {
  const secrets = getVerificationSecrets(env.JWT_SECRET, env.JWT_SECRET_PREVIOUS);
  let lastError: unknown;

  for (const secret of secrets) {
    try {
      const decoded = jwt.verify(token, secret);
      if (typeof decoded !== "object" || decoded === null) {
        throw new Error("Invalid token payload");
      }

      const payload = decodePayload(decoded as JwtLibPayload & Record<string, unknown>);

      if (expectedTokenVersion !== undefined && payload.tv !== expectedTokenVersion) {
        throw new Error("Token version mismatch");
      }

      if (payload.jti && (await isAccessTokenRevoked(payload.jti))) {
        throw new Error("Token revoked");
      }

      return payload;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Invalid or expired token");
}

export function verifyRefreshToken(token: string): { sub: string; tenantId: string; jti: string; tv: number; exp?: number } {
  const secrets = getVerificationSecrets(env.JWT_REFRESH_SECRET, env.JWT_REFRESH_SECRET_PREVIOUS);
  let lastError: unknown;

  for (const secret of secrets) {
    try {
      const decoded = jwt.verify(token, secret);
      if (typeof decoded !== "object" || decoded === null) {
        throw new Error("Invalid refresh token payload");
      }

      const record = decoded as Record<string, unknown>;
      if (record.type !== "refresh") {
        throw new Error("Invalid refresh token type");
      }

      return {
        sub: String(record.sub),
        tenantId: String(record.tenantId),
        jti: String(record.jti ?? ""),
        tv: Number(record.tv ?? 0),
        exp: typeof record.exp === "number" ? record.exp : undefined,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Invalid refresh token");
}

export function getTokenExpiryDate(exp?: number): Date {
  if (!exp) {
    return new Date(Date.now() + 15 * 60 * 1000);
  }
  return new Date(exp * 1000);
}
