export const STAFF_CONFIG_ROUTES = {
  listNamespaces: "/staff/:staffId/config",
  getByNamespace: "/staff/:staffId/config/:namespace",
  updateByNamespace: "/staff/:staffId/config/:namespace",
} as const;
