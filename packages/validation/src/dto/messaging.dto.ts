import { z } from "zod";

export const conversationParticipantSchema = z.object({
  userId: z.string().min(1),
  role: z.string().min(1),
});

export const createConversationSchema = z.object({
  participants: z.array(conversationParticipantSchema).min(1),
  initialMessage: z.string().trim().min(1).max(5000).optional(),
});

export const createMessageSchema = z.object({
  content: z.string().trim().min(1).max(5000),
});

export const listMessagesSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  since: z.string().datetime().optional(),
});

export const messageTypingSchema = z.object({
  isTyping: z.boolean(),
});

export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type ListMessagesInput = z.infer<typeof listMessagesSchema>;
export type MessageTypingInput = z.infer<typeof messageTypingSchema>;
