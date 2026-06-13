export const DRIFT_ROUTES = {
  summary: "models/:id",
  events: "models/:id/events",
  metrics: "models/:id/metrics",
  run: "models/:id/run",
  resolveEvent: "models/:id/events/:eventId/resolve",
  mitigateRetrain: "models/:id/mitigate/retrain",
  mitigateRollback: "models/:id/mitigate/rollback",
  mitigateReduceRollout: "models/:id/mitigate/reduce-rollout",
} as const;
