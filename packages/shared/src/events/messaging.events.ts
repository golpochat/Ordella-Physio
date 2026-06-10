export type MessagingConversationCreatedPayload = {
  conversationId: string;
  tenantId: string;
  participantUserIds: string[];
  createdBy: string;
  createdAt: string;
};

export type MessagingMessageCreatedPayload = {
  messageId: string;
  conversationId: string;
  tenantId: string;
  senderId: string;
  content: string;
  recipientUserIds: string[];
  createdAt: string;
};

export type MessagingMessageReadPayload = {
  messageId: string;
  conversationId: string;
  tenantId: string;
  userId: string;
  readAt: string;
};

export type MessagingTypingPayload = {
  conversationId: string;
  tenantId: string;
  userId: string;
  isTyping: boolean;
  occurredAt: string;
};
