export const DATASET_VERSION_ROUTES = {
  list: "/ai/datasets/:id/versions",
  diff: "/ai/datasets/:id/versions/:v1/diff/:v2",
  rollback: "/ai/datasets/:id/versions/:versionNumber/rollback",
} as const;
