export const APPOINTMENT_REMINDER_ROUTES = {
  list: "/appointments/:appointmentId/reminders",
  create: "/appointments/:appointmentId/reminders",
  update: "/appointments/:appointmentId/reminders/:reminderId",
} as const;
