import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { createJwtConfigFromEnv, type AccessTokenPayload } from "@ordella/security";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (_request, _rawJwtToken, done) => {
        const secret = createJwtConfigFromEnv().secret;
        if (!secret) {
          done(new Error("JWT secret is not configured"));
          return;
        }
        done(null, secret);
      },
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
