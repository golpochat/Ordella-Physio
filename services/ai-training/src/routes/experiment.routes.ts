export const EXPERIMENT_ROUTES = {
  list: "/ai/training/:id/experiments",
  detail: "/ai/training/experiments/:experimentId",
  label: "/ai/training/experiments/:experimentId/label",
  checkpoints: "/ai/training/:id/checkpoints",
  resume: "/ai/training/:id/resume/:checkpointNumber",
} as const;
