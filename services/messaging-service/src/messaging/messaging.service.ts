import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type {
  CreateConversationInput,
  CreateMessageInput,
  ListMessagesInput,
  MessageTypingInput,
} from "@ordella/validation";
import { MessagingEventPublisher } from "@/events/messaging-event.publisher";
import { MessagingRepository } from "@/messaging/messaging.repository";
import { toConversationResponse, toMessageResponse } from "@/messaging/messaging.mapper";
import { TypingService } from "@/messaging/typing.service";
import type { AuthenticatedMessagingUser } from "@/utils/messaging-helpers";

@Injectable()
export class MessagingService {
  constructor(
    private readonly repository: MessagingRepository,
    private readonly events: MessagingEventPublisher,
    private readonly typingService: TypingService,
  ) {}

  private async assertParticipant(conversationId: string, userId: string) {
    const participant = await this.repository.isParticipant(conversationId, userId);
    if (!participant) {
      throw new ForbiddenException("You are not a participant in this conversation");
    }
    return participant;
  }

  async createConversation(
    tenantId: string,
    user: AuthenticatedMessagingUser,
    input: CreateConversationInput,
    correlationId?: string,
  ) {
    const participantMap = new Map<string, string>();

    for (const participant of input.participants) {
      if (participant.userId === user.userId) {
        continue;
      }
      participantMap.set(participant.userId, participant.role);
    }

    if (participantMap.size === 0) {
      throw new ForbiddenException("At least one other participant is required");
    }

    const allParticipants = [
      { userId: user.userId, role: String(user.role) },
      ...Array.from(participantMap.entries()).map(([userId, role]) => ({ userId, role })),
    ];

    const conversation = await this.repository.createConversation(tenantId, allParticipants);

    await this.events.publishConversationCreated(
      {
        conversationId: conversation.id,
        tenantId,
        participantUserIds: allParticipants.map((participant) => participant.userId),
        createdBy: user.userId,
        createdAt: conversation.createdAt.toISOString(),
      },
      correlationId,
    );

    if (input.initialMessage?.trim()) {
      await this.createMessage(
        tenantId,
        user,
        conversation.id,
        { content: input.initialMessage.trim() },
        correlationId,
      );
    }

    const refreshed = await this.repository.findConversationById(tenantId, conversation.id);
    if (!refreshed) {
      throw new NotFoundException("Conversation not found");
    }

    return toConversationResponse(refreshed, user.userId);
  }

  async listConversations(tenantId: string, userId: string) {
    const conversations = await this.repository.listConversations(tenantId, userId);
    return Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount = await this.repository.countUnreadInConversation(conversation.id, userId);
        return { ...toConversationResponse(conversation, userId), unreadCount };
      }),
    );
  }

  async getConversation(tenantId: string, userId: string, conversationId: string) {
    const conversation = await this.repository.findConversationById(tenantId, conversationId);
    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    await this.assertParticipant(conversationId, userId);
    const unreadCount = await this.repository.countUnreadInConversation(conversationId, userId);
    return { ...toConversationResponse(conversation, userId), unreadCount };
  }

  async createMessage(
    tenantId: string,
    user: AuthenticatedMessagingUser,
    conversationId: string,
    input: CreateMessageInput,
    correlationId?: string,
  ) {
    const conversation = await this.repository.findConversationById(tenantId, conversationId);
    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    await this.assertParticipant(conversationId, user.userId);

    const message = await this.repository.createMessage(conversationId, user.userId, input.content);

    const recipientUserIds = conversation.participants
      .map((participant) => participant.userId)
      .filter((participantUserId) => participantUserId !== user.userId);

    await this.events.publishMessageCreated(
      {
        messageId: message.id,
        conversationId,
        tenantId,
        senderId: user.userId,
        content: message.content,
        recipientUserIds,
        createdAt: message.createdAt.toISOString(),
      },
      correlationId,
    );

    return toMessageResponse(message, user.userId);
  }

  async listMessages(
    tenantId: string,
    userId: string,
    conversationId: string,
    query: ListMessagesInput,
  ) {
    const conversation = await this.repository.findConversationById(tenantId, conversationId);
    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    await this.assertParticipant(conversationId, userId);

    const messages = await this.repository.listMessages(conversationId, {
      cursor: query.cursor,
      limit: query.limit,
      since: query.since ? new Date(query.since) : undefined,
    });

    const typingUsers = await this.typingService.getTypingUsers(conversationId, userId);

    return {
      items: messages.map((message) => toMessageResponse(message, userId)),
      typingUsers,
    };
  }

  async markMessageRead(
    tenantId: string,
    user: AuthenticatedMessagingUser,
    messageId: string,
    correlationId?: string,
  ) {
    const message = await this.repository.findMessageById(messageId);
    if (!message || message.conversation.tenantId !== tenantId) {
      throw new NotFoundException("Message not found");
    }

    await this.assertParticipant(message.conversationId, user.userId);

    if (message.senderId === user.userId) {
      return toMessageResponse(message, user.userId);
    }

    const { message: updated } = await this.repository.markMessageRead(messageId, user.userId);

    if (!updated) {
      throw new NotFoundException("Message not found");
    }

    await this.events.publishMessageRead(
      {
        messageId,
        conversationId: message.conversationId,
        tenantId,
        userId: user.userId,
        readAt: new Date().toISOString(),
      },
      correlationId,
    );

    return toMessageResponse(updated, user.userId);
  }

  async setTyping(
    tenantId: string,
    user: AuthenticatedMessagingUser,
    messageId: string,
    input: MessageTypingInput,
    correlationId?: string,
  ) {
    const message = await this.repository.findMessageById(messageId);
    if (!message || message.conversation.tenantId !== tenantId) {
      throw new NotFoundException("Message not found");
    }

    await this.assertParticipant(message.conversationId, user.userId);

    if (input.isTyping) {
      await this.typingService.setTyping(message.conversationId, user.userId);
    }

    await this.events.publishTyping(
      {
        conversationId: message.conversationId,
        tenantId,
        userId: user.userId,
        isTyping: input.isTyping,
        occurredAt: new Date().toISOString(),
      },
      correlationId,
    );

    return { success: true };
  }

  async getUnreadCount(tenantId: string, userId: string) {
    const count = await this.repository.countUnread(tenantId, userId);
    return { count };
  }
}
