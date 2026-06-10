import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class RefreshGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ body?: { refreshToken?: string } }>();
    if (!request.body?.refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }
    return true;
  }
}
