export const TRAINING_DASHBOARD_ROUTES = {
  dashboard: "/ai/training/:id/dashboard",
  logsStream: "/ai/training/:id/logs/stream",
  metricsStream: "/ai/training/:id/metrics/stream",
  compare: "/ai/training/:id/experiments/compare",
} as const;
