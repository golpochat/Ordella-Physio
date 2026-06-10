import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { enterpriseConfig } from "@ordella/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { AuthenticatedEnterpriseUser } from "@/utils/enterprise-helpers";

type JwtPayload = {
  sub: string;
  userId?: string;
  tenantId: string;
  role: string;
  email?: string;
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
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
    };
  }
}
