import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { organizationConfig } from "@ordella/config";
import type { AccessTokenPayload } from "@ordella/security";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: organizationConfig.jwtSecret,
    });
  }

  validate(payload: AccessTokenPayload & { permissions?: string[] }): AuthenticatedOrganizationUser {
    return {
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
      permissions: payload.permissions,
    };
  }
}
