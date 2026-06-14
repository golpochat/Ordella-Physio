import cors from "cors";
import express from "express";
import helmet from "helmet";
import { apiRouter } from "./routes";
import {
  authMiddleware,
  errorHandler,
  notFoundHandler,
  resolveTenantHeaderMiddleware,
  tenantMiddleware,
} from "./middleware";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(tenantMiddleware);
  app.use(resolveTenantHeaderMiddleware);
  app.use(authMiddleware);

  app.use("/api", apiRouter);
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
