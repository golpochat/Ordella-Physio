import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { pharmacyConfig } from "@ordella/config";
import type { AccessTokenPayload, SecurityRole } from "@ordella/security";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: pharmacyConfig.jwtSecret,
    });
  }

  validate(payload: AccessTokenPayload & { permissions?: string[] }): AuthenticatedPharmacyUser {
    return {
      userId: payload.userId,
      tenantId: payload.tenantId ?? "",
      role: payload.role as SecurityRole,
      email: payload.email,
      permissions: payload.permissions,
    };
  }
}
