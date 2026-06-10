import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createConversationSchema,
  createMessageSchema,
  listMessagesSchema,
  messageTypingSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { JwtGuard } from "@/messaging/guards/jwt.guard";
import { MessagingTenantGuard } from "@/messaging/guards/messaging-tenant.guard";
import { TenantId } from "@/messaging/guards/tenant-id.decorator";
import { MessagingService } from "@/messaging/messaging.service";
import type { AuthenticatedMessagingUser } from "@/utils/messaging-helpers";
import type { CreateConversationInput } from "@ordella/validation";
import type { CreateMessageInput } from "@ordella/validation";
import type { ListMessagesInput } from "@ordella/validation";
import type { MessageTypingInput } from "@ordella/validation";

@Controller("messaging")
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "messaging-service" };
  }

  @Get("unread-count")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.read")
  unreadCount(@TenantId() tenantId: string, @Req() request: OrdellaRequest) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.getUnreadCount(tenantId, user.userId);
  }

  @Post("conversations")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.write")
  @UseZodValidation(createConversationSchema)
  createConversation(
    @TenantId() tenantId: string,
    @Body() dto: CreateConversationInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.createConversation(tenantId, user, dto, request.correlationId);
  }

  @Get("conversations")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.read")
  listConversations(@TenantId() tenantId: string, @Req() request: OrdellaRequest) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.listConversations(tenantId, user.userId);
  }

  @Get("conversations/:id")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.read")
  getConversation(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.getConversation(tenantId, user.userId, id);
  }

  @Post("conversations/:id/messages")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.write")
  @UseZodValidation(createMessageSchema)
  createMessage(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: CreateMessageInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.createMessage(tenantId, user, id, dto, request.correlationId);
  }

  @Get("conversations/:id/messages")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.read")
  @UseZodValidation(listMessagesSchema, "query")
  listMessages(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Query() query: ListMessagesInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.listMessages(tenantId, user.userId, id, query);
  }

  @Post("messages/:id/read")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.write")
  markRead(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.markMessageRead(tenantId, user, id, request.correlationId);
  }

  @Post("messages/:id/typing")
  @UseGuards(JwtGuard, MessagingTenantGuard, PermissionGuard)
  @RequirePermissions("messaging.write")
  @UseZodValidation(messageTypingSchema)
  setTyping(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: MessageTypingInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedMessagingUser;
    return this.messagingService.setTyping(tenantId, user, id, dto, request.correlationId);
  }
}
