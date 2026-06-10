export type MessageCreatedEvent = {
  messageId: string;
  conversationId: string;
  tenantId: string;
  senderId: string;
  content: string;
  recipientUserIds: string[];
  createdAt: string;
};
