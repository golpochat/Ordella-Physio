export const APPOINTMENT_ROUTES = {
  base: "/appointments",
  health: "/appointments/health",
  create: "/appointments",
  list: "/appointments",
  getById: "/appointments/:id",
  update: "/appointments/:id",
  cancel: "/appointments/:id/cancel",
  complete: "/appointments/:id/complete",
  noShow: "/appointments/:id/no-show",
  calendar: "/appointments/calendar",
} as const;
