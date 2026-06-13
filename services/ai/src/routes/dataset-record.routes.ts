export const DATASET_RECORD_ROUTES = {
  list: "/ai/datasets/:id/versions/:versionId/records",
  record: "/ai/datasets/records/:recordId",
  labels: "/ai/datasets/records/:recordId/labels",
  embed: "/ai/datasets/:id/versions/:versionId/embed",
} as const;
