import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import type { ApiResponse } from "@ordella/shared";
import type { Request } from "express";
import { CORRELATION_ID_HEADER, TENANT_HEADER, type GatewayUser } from "@/constants";
import { getRequestPath } from "@/utils/route-builder";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request & { user?: GatewayUser }>();
    const start = Date.now();
    const path = getRequestPath(request);
    const tenantId = request.headers[TENANT_HEADER] ?? request.headers[TENANT_HEADER.toLowerCase()];
    const correlationId =
      request.headers[CORRELATION_ID_HEADER] ??
      request.headers[CORRELATION_ID_HEADER.toLowerCase()];

    this.logger.log(
      `Incoming ${request.method} ${path} tenant=${tenantId ?? "n/a"} user=${request.user?.userId ?? "anonymous"} correlation=${correlationId ?? "n/a"}`,
    );

    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.log(
            `Completed ${request.method} ${path} ${Date.now() - start}ms tenant=${tenantId ?? "n/a"} user=${request.user?.userId ?? "anonymous"}`,
          );
        },
        error: (error: Error) => {
          this.logger.error(
            `Failed ${request.method} ${path} ${Date.now() - start}ms tenant=${tenantId ?? "n/a"} user=${request.user?.userId ?? "anonymous"} error=${error.message}`,
          );
        },
      }),
      map((data) => {
        if (data && typeof data === "object" && "status" in (data as Record<string, unknown>)) {
          return data;
        }

        return {
          data,
        } satisfies ApiResponse<unknown>;
      }),
    );
  }
}
