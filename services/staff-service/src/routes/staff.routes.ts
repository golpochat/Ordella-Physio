export const STAFF_ROUTES = {
  base: "/staff",
  health: "/staff/health",
  list: "/staff",
  create: "/staff",
  update: "/staff/:id",
  getById: "/staff/:id",
  deactivate: "/staff/:id/deactivate",
  activate: "/staff/:id/activate",
  configList: "/staff/:staffId/config",
  configGet: "/staff/:staffId/config/:namespace",
  configUpdate: "/staff/:staffId/config/:namespace",
} as const;
