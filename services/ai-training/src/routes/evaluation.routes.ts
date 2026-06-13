export const EVALUATION_ROUTES = {
  evaluate: ":id/evaluate",
  evaluations: ":id/evaluations",
  latestEvaluation: ":id/evaluations/latest",
} as const;

export const PROMOTION_ROUTES = {
  promoteStaging: ":id/promote/staging",
  promoteProduction: ":id/promote/production",
  deprecate: ":id/deprecate",
  rollout: ":id/rollout",
  promotion: ":id/promotion",
} as const;
