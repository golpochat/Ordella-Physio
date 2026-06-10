import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { enterpriseConfig } from "@ordella/config";
import { firstValueFrom } from "rxjs";
import type { Request } from "express";
import type { SecurityUser } from "@ordella/security";

@Injectable()
export class EnterprisePlanGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: SecurityUser; tenantId?: string }>();
    const user = request.user;
    if (!user) throw new UnauthorizedException("Authentication required");

    if (user.role === "SYSTEM") {
      return true;
    }

    const tenantId = request.tenantId ?? user.tenantId;
    const config = enterpriseConfig;
    const url = `${config.tenantServiceUrl}/tenants/${tenantId}/subscription`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<{ plan?: string }>(url, {
          headers: request.headers.authorization ? { authorization: request.headers.authorization } : {},
          validateStatus: () => true,
        }),
      );

      const plan = response.data?.plan ?? "STARTER";
      if (plan !== "ENTERPRISE") {
        throw new ForbiddenException("Enterprise plan required for this feature");
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;
      throw new ForbiddenException("Unable to verify enterprise plan");
    }
  }
}
