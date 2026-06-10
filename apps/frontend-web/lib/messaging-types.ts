export type MessagingParticipant = {
  id: string;
  userId: string;
  role: string;
};

export type MessagingMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  readBy: Array<{ userId: string; readAt: string }>;
  isOwn: boolean;
  isRead: boolean;
  optimistic?: boolean;
};

export type MessagingConversation = {
  id: string;
  tenantId: string;
  participants: MessagingParticipant[];
  lastMessage: MessagingMessage | null;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type MessagingParticipantOption = {
  userId: string;
  label: string;
  role: string;
};

export type MessagingMessagesResponse = {
  items: MessagingMessage[];
  typingUsers: string[];
};

export type CreateConversationPayload = {
  participants: Array<{ userId: string; role: string }>;
  initialMessage?: string;
};
