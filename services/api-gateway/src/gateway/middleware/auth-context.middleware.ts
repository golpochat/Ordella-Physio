import { createAuthContextMiddleware } from "@ordella/middleware";
import { PUBLIC_PATHS } from "@/constants";

export const AuthContextMiddleware = createAuthContextMiddleware({
  required: false,
  skipPaths: PUBLIC_PATHS,
});
