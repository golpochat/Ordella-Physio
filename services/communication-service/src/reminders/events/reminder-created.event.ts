export type ReminderCreatedEvent = {
  tenantId: string;
  reminderId: string;
  type: string;
  channel: string;
  sendAt: string;
  createdAt: string;
};
