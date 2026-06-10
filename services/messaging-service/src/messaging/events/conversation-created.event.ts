export type ConversationCreatedEvent = {
  conversationId: string;
  tenantId: string;
  participantUserIds: string[];
  createdBy: string;
  createdAt: string;
};
