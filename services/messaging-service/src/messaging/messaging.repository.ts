import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";
import { DEFAULT_MESSAGES_PAGE_SIZE } from "@/constants";

export type ParticipantInput = {
  userId: string;
  role: string;
};

@Injectable()
export class MessagingRepository {
  constructor(private readonly db: DatabaseService) {}

  createConversation(tenantId: string, participants: ParticipantInput[]) {
    return this.db.conversation.create({
      data: {
        tenantId,
        participants: {
          create: participants.map((participant) => ({
            userId: participant.userId,
            role: participant.role,
          })),
        },
      },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  }

  findConversationById(tenantId: string, conversationId: string) {
    return this.db.conversation.findFirst({
      where: { id: conversationId, tenantId },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { readReceipts: true },
        },
      },
    });
  }

  listConversations(tenantId: string, userId: string) {
    return this.db.conversation.findMany({
      where: {
        tenantId,
        participants: { some: { userId } },
      },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { readReceipts: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  isParticipant(conversationId: string, userId: string) {
    return this.db.conversationParticipant.findFirst({
      where: { conversationId, userId },
    });
  }

  createMessage(conversationId: string, senderId: string, content: string) {
    return this.db.$transaction(async (tx) => {
      const message = await tx.message.create({
        data: { conversationId, senderId, content },
        include: { readReceipts: true },
      });

      await tx.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      return message;
    });
  }

  async listMessages(
    conversationId: string,
    options: { cursor?: string; limit?: number; since?: Date },
  ) {
    const limit = options.limit ?? DEFAULT_MESSAGES_PAGE_SIZE;

    if (options.since) {
      return this.db.message.findMany({
        where: {
          conversationId,
          createdAt: { gt: options.since },
        },
        include: { readReceipts: true },
        orderBy: { createdAt: "asc" },
        take: limit,
      });
    }

    const messages = await this.db.message.findMany({
      where: { conversationId },
      include: { readReceipts: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return messages.reverse();
  }

  findMessageById(messageId: string) {
    return this.db.message.findUnique({
      where: { id: messageId },
      include: {
        conversation: { include: { participants: true } },
        readReceipts: true,
      },
    });
  }

  markMessageRead(messageId: string, userId: string) {
    return this.db.$transaction(async (tx) => {
      const receipt = await tx.messageRead.upsert({
        where: { messageId_userId: { messageId, userId } },
        create: { messageId, userId },
        update: { readAt: new Date() },
      });

      await tx.message.update({
        where: { id: messageId },
        data: { readAt: new Date() },
      });

      const message = await tx.message.findUnique({
        where: { id: messageId },
        include: { readReceipts: true },
      });

      return { receipt, message };
    });
  }

  countUnread(tenantId: string, userId: string) {
    return this.db.message.count({
      where: {
        senderId: { not: userId },
        conversation: {
          tenantId,
          participants: { some: { userId } },
        },
        readReceipts: { none: { userId } },
      },
    });
  }

  countUnreadInConversation(conversationId: string, userId: string) {
    return this.db.message.count({
      where: {
        conversationId,
        senderId: { not: userId },
        readReceipts: { none: { userId } },
      },
    });
  }
}
