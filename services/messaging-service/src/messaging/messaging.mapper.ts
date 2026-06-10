import type { Conversation, ConversationParticipant, Message, MessageRead } from "@/generated/prisma";

type MessageWithReceipts = Message & { readReceipts: MessageRead[] };

type ConversationWithRelations = Conversation & {
  participants: ConversationParticipant[];
  messages: MessageWithReceipts[];
};

export function toMessageResponse(message: MessageWithReceipts, currentUserId: string) {
  return {
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
    readAt: message.readAt?.toISOString() ?? null,
    readBy: message.readReceipts.map((receipt) => ({
      userId: receipt.userId,
      readAt: receipt.readAt.toISOString(),
    })),
    isOwn: message.senderId === currentUserId,
    isRead: message.readReceipts.some((receipt) => receipt.userId === currentUserId) || message.senderId === currentUserId,
  };
}

export function toConversationResponse(
  conversation: ConversationWithRelations,
  currentUserId: string,
) {
  const lastMessage = conversation.messages[0] ?? null;

  return {
    id: conversation.id,
    tenantId: conversation.tenantId,
    participants: conversation.participants.map((participant) => ({
      id: participant.id,
      userId: participant.userId,
      role: participant.role,
    })),
    lastMessage: lastMessage ? toMessageResponse(lastMessage, currentUserId) : null,
    createdAt: conversation.createdAt.toISOString(),
    updatedAt: conversation.updatedAt.toISOString(),
  };
}
