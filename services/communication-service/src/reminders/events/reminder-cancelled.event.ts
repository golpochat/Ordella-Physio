export type ReminderCancelledEvent = {
  tenantId: string;
  reminderId: string;
  reason?: string;
  cancelledAt: string;
};
