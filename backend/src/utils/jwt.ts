import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config";
import type { JwtPayload } from "../types/express";

const accessSignOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };
const refreshSignOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"] };

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, accessSignOptions);
}

export function signRefreshToken(userId: string, tenantId: string): string {
  return jwt.sign({ sub: userId, tenantId, type: "refresh" }, env.JWT_REFRESH_SECRET, refreshSignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token payload");
  }

  const record = decoded as Record<string, unknown>;
  return {
    sub: String(record.sub),
    tenantId: String(record.tenantId),
    email: String(record.email),
    roles: Array.isArray(record.roles) ? record.roles.map(String) : [],
    permissions: Array.isArray(record.permissions) ? record.permissions.map(String) : [],
  };
}

export function verifyRefreshToken(token: string): { sub: string; tenantId: string } {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid refresh token payload");
  }

  const record = decoded as Record<string, unknown>;
  if (record.type !== "refresh") {
    throw new Error("Invalid refresh token type");
  }

  return { sub: String(record.sub), tenantId: String(record.tenantId) };
}
