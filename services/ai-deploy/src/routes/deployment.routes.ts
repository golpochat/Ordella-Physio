import { HEALTH_ROUTES } from "@/routes/health.routes";

export const DEPLOYMENT_ROUTES = {
  base: "/ai/deploy",
  health: HEALTH_ROUTES.health,
};
