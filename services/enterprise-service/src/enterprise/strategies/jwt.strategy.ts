import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { enterpriseConfig } from "@ordella/config";
import type { AccessTokenPayload } from "@ordella/security";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { AuthenticatedEnterpriseUser } from "@/utils/enterprise-helpers";

type JwtPayload = AccessTokenPayload & {
  permissions?: string[];
  resolvedPermissions?: string[];
  effectiveRole?: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: enterpriseConfig.jwtSecret,
    });
  }

  validate(payload: JwtPayload): AuthenticatedEnterpriseUser {
    return {
      userId: payload.userId ?? payload.sub,
      tenantId: payload.tenantId ?? "",
      role: payload.role,
      effectiveRole: payload.effectiveRole,
      email: payload.email,
      permissions: payload.resolvedPermissions ?? payload.permissions,
    };
  }
}
