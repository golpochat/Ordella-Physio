import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from "@nestjs/common";
import { gatewayConfig } from "@ordella/config";
import { Observable, TimeoutError, catchError, timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const config = gatewayConfig;

    return next.handle().pipe(
      timeout(config.gatewayTimeoutMs),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          throw new RequestTimeoutException("Gateway request timed out");
        }
        throw error;
      }),
    );
  }
}
