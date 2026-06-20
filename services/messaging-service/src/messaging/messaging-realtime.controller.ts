import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import type { OrdellaRequest } from "@ordella/middleware";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import { JwtGuard } from "@/messaging/guards/jwt.guard";
import { MessagingTenantGuard } from "@/messaging/guards/messaging-tenant.guard";
import { MessagingRealtimeService } from "@/messaging/messaging-realtime.service";
import type { AuthenticatedMessagingUser } from "@/utils/messaging-helpers";

@Controller("messaging")
export class MessagingRealtimeController {
  constructor(private readonly realtime: MessagingRealtimeService) {}

  @Get("stream")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.read")
  stream(@Req() request: OrdellaRequest, @Res() response: Response) {
    const user = request.user as AuthenticatedMessagingUser;
    const tenantId = request.tenantId ?? user.tenantId ?? "";
    const userId = user.userId;

    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders();

    response.write(`event: connected\ndata: ${JSON.stringify({ tenantId, userId })}\n\n`);

    const subscription = this.realtime.streamForUser(tenantId, userId).subscribe({
      next: (event) => {
        response.write(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
      },
      error: () => {
        response.end();
      },
    });

    const heartbeat = setInterval(() => {
      response.write(`: ping\n\n`);
    }, 25_000);

    request.on("close", () => {
      clearInterval(heartbeat);
      subscription.unsubscribe();
      response.end();
    });
  }
}
