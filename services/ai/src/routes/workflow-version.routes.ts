export const WORKFLOW_VERSION_ROUTES = {
  list: "/ai/workflows/:id/versions",
  detail: "/ai/workflows/:id/versions/:versionNumber",
  diff: "/ai/workflows/:id/versions/:v1/diff/:v2",
  rollback: "/ai/workflows/:id/versions/:versionNumber/rollback",
  label: "/ai/workflows/:id/versions/:versionNumber/label",
} as const;
