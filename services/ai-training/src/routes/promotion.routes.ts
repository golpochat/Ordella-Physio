export const PROMOTION_ROUTES = {
  promoteStaging: ":id/promote/staging",
  promoteProduction: ":id/promote/production",
  deprecate: ":id/deprecate",
  rollout: ":id/rollout",
  promotion: ":id/promotion",
  startCanary: ":id/canary/start",
  monitorCanary: ":id/canary/monitor",
  autoAdjustCanary: ":id/canary/adjust",
} as const;
