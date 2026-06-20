import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { createJwtConfigFromEnv, type AccessTokenPayload } from "@ordella/security";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    const secret = createJwtConfigFromEnv().secret;
    if (!secret) {
      throw new Error("JWT secret is not configured");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: AccessTokenPayload & { permissions?: string[] }): AuthenticatedTenantUser {
    return {
      userId: payload.userId,
      tenantId: payload.tenantId ?? "",
      role: payload.role,
      email: payload.email,
      permissions: payload.permissions,
    };
  }
}
